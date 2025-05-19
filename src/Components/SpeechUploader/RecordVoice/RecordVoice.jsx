import MicIcon from "../../../Assets/images/micIconWhite.png";
import ShowAudioDetails from "../../ShowAudioDetails/ShowAudioDetails";
import styles from "./RecordVoice.module.css";
import { useState, useRef } from "react";

export default function RecordVoice() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Microphone access denied or error:", error);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  return (
    <>
      {audioUrl ? (
        <ShowAudioDetails
          audioUrl={audioUrl}
          onRestart={() => setAudioUrl(null)}
        />
      ) : (
        <>
          <button
            className={styles.mic}
            onClick={isRecording ? stopRecording : startRecording}
          >
            <img src={MicIcon} />
          </button>
          {isRecording ? (
            <p>در حال ضبط ...</p>
          ) : (
            <p>
              برای شروع به صحبت، دکمه را فشار دهید
              <br />
              متن پیاده شده آن، در اینجا ظاهر شود
            </p>
          )}
        </>
      )}
    </>
  );
}
