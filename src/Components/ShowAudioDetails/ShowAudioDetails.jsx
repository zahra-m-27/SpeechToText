import DownloadIcon from "../../Assets/images/downloadIcon.png";
import CopyIcon from "../../Assets/images/copyIcon.png";
import RestartIcon from "../../Assets/images/restartIcon.png";
import TextIcon from "../../Assets/images/textIcon.png";
import TimeIcon from "../../Assets/images/timeIcon.png";
import styles from "./ShowAudioDetails.module.css";
import { useEffect, useRef, useState } from "react";
import AudioPlayer from "./AudioPlayer/AudioPlayer";
import { useSelector } from "react-redux";

function timeToSeconds(timeStr) {
  if (!timeStr) return 0;
  const [h, m, s] = timeStr.split(":").map(Number);
  return h * 3600 + m * 60 + s;
}

export default function ShowAudioDetails({
  iconsStyle,
  separatorStyle,
  audioUrl,
  onRestart,
  segments,
}) {
  const [activeTab, setActiveTab] = useState("simple");
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);
  const segmentRefs = useRef([]);
  const language = useSelector((state) => state.language.value);
  const activeIndex = segments.findIndex(
    (seg) =>
      currentTime >= timeToSeconds(seg.start) &&
      currentTime < timeToSeconds(seg.end)
  );

  const handleJump = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      // audioRef.current.play();
    }
  };

  function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`;
  }

  useEffect(() => {
    const activeEl = segmentRefs.current[activeIndex];
    if (activeEl && activeEl.scrollIntoView) {
      activeEl.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeIndex, segments]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span
          className={activeTab == "simple" ? styles.active : ""}
          onClick={() => setActiveTab("simple")}
        >
          <img src={TextIcon} alt="text icon" />
          متن ساده
          <div className={styles.underline}></div>
        </span>
        <span
          className={activeTab == "timed" ? styles.active : ""}
          onClick={() => setActiveTab("timed")}
        >
          <img src={TimeIcon} />
          متن زمان‌بندی شده
          <div className={styles.underline}></div>
        </span>
        <div className={styles.left} style={iconsStyle}>
          <img src={DownloadIcon} className={styles.download} />
          <img src={CopyIcon} className={styles.copy} />
          <button onClick={onRestart}>
            <img src={RestartIcon} className={styles.restart} />
            شروع دوباره
          </button>
        </div>
      </div>
      <div className={styles.separator} style={separatorStyle}></div>
      {activeTab == "simple" ? (
        <div className={styles.test}>
          <div className={styles.textContainer}>
            <p
              style={
                language == "english"
                  ? { textAlign: "left" }
                  : { textAlign: "right" }
              }
            >
              {segments.map((item, index) => {
                const isActive = index === activeIndex;

                return (
                  <span
                    key={index}
                    className={isActive ? styles.activeRow : null}
                    ref={(el) => (segmentRefs.current[index] = el)}
                  >
                    {`${item.text} `}
                  </span>
                );
              })}
            </p>
          </div>
          <AudioPlayer
            audioRef={audioRef}
            setCurrentTime={setCurrentTime}
            audioSrc={audioUrl}
          />
        </div>
      ) : (
        <div className={styles.test}>
          <ul className={styles.transcriptContainer}>
            {segments.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <li
                  onClick={() => handleJump(item.start)}
                  className={isActive ? styles.activeRow : null}
                  key={index}
                  ref={(el) => (segmentRefs.current[index] = el)}
                >
                  <span>{formatTime(timeToSeconds(item.end))}</span>
                  <span>{formatTime(timeToSeconds(item.start))}</span>
                  <span className={styles.label}>{item.text}</span>
                </li>
              );
            })}
          </ul>
          <AudioPlayer
            audioRef={audioRef}
            setCurrentTime={setCurrentTime}
            audioSrc={audioUrl}
          />
        </div>
      )}
    </div>
  );
}
