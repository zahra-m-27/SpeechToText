import StopIcon from "../../../Assets/images/stopIcon.png";
import PauseIcon from "../../../Assets/images/pauseIcon.png";
import VolumeIcon from "../../../Assets/images/volumeIcon.png";
import MuteIcon from "../../../Assets/images/muteIcon.png";
import PlayIcon from "../../../Assets/images/playIcon.png";
import { useState, useEffect } from "react";
import "./AudioPlayer.css";

export default function AudioPlayer({ audioSrc, setCurrentTime, audioRef }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [localTime, setLocalTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    const audio = audioRef.current;
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    const audio = audioRef.current;
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    const percent = (audio.currentTime / audio.duration) * 100;
    setProgress(percent);
    setCurrentTime(audio.currentTime);
    setLocalTime(audio.currentTime);
  };

  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    const percent = e.target.value;
    audio.currentTime = (percent / 100) * audio.duration;
    setProgress(percent);
  };

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    const audio = audioRef.current;

    audio.volume = vol;

    if (vol === 0) {
      audio.muted = true;
      setIsMuted(true);
    } else {
      if (audio.muted) {
        audio.muted = false;
        setIsMuted(false);
      }
    }

    setVolume(vol);

    e.target.style.setProperty("--volume-fill", `${vol * 100}%`);
  };

  const updateBuffered = () => {
    const audio = audioRef.current;
    if (audio.buffered.length) {
      const bufferedEnd = audio.buffered.end(audio.buffered.length - 1);
      const percent = (bufferedEnd / audio.duration) * 100;
      setBuffered(percent);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener("progress", updateBuffered);
    return () => {
      audio.removeEventListener("progress", updateBuffered);
    };
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="audio-player">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        src={audioSrc}
      />

      <div className="volume">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="volumeSlider"
          style={{ "--volume-fill": `${volume * 100}%` }}
        />
        <img
          src={isMuted ? MuteIcon : VolumeIcon}
          alt="Volume"
          className="icon"
          onClick={toggleMute}
        />
      </div>
      <span className="time">{formatTime(localTime)}</span>

      <div className="progress-container">
        <div className="progress-bar-bg">
          <div className="buffered" style={{ width: `${buffered}%` }}></div>
          <div className="played" style={{ width: `${progress}%` }}></div>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleProgressChange}
          className="progress-slider"
        />
      </div>
      <img
        src={isPlaying ? PauseIcon : PlayIcon}
        className="icon"
        onClick={togglePlay}
      />
      <img
        src={StopIcon}
        className="icon"
        onClick={handleStop}
        disabled={localTime === 0}
      />
    </div>
  );
}
