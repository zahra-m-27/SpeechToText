import MicIcon from "../../../Assets/images/micIconWhite.png";
import ShowAudioDetails from "../../ShowAudioDetails/ShowAudioDetails";
import styles from "./RecordVoice.module.css";
import { useState, useRef } from "react";

export default function RecordVoice() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
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
      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const file = new File([blob], "recording.webm", { type: "audio/webm" });

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "SpeechTest");
        formData.append("cloud_name", "dik8zqi6k");

        try {
          const res = await fetch(
            "https://api.cloudinary.com/v1_1/dik8zqi6k/video/upload",
            {
              method: "POST",
              body: formData,
            }
          );
          const data = await res.json();
          console.log("Uploaded file URL:", data.secure_url);

          setAudioUrl(data.secure_url);
        } catch (err) {
          console.error("Upload failed", err);
        } finally {
          setIsUploading(false);
        }
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
      {isUploading ? (
        <p>
          در حال بارگذاری <br /> لطفا صبر کنید ...
        </p>
      ) : audioUrl ? (
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
