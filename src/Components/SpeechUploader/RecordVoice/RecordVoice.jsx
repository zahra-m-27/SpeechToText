import { useState, useRef } from "react";
import MicIcon from "../../../Assets/images/micIconWhite.png";
import ShowAudioDetails from "../../ShowAudioDetails/ShowAudioDetails";
import styles from "./RecordVoice.module.css";

export default function RecordVoice() {
  const [status, setStatus] = useState("idle"); // idle | recording | uploading | uploaded | error
  const [audioUrl, setAudioUrl] = useState(null);
  const [error, setError] = useState("");

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

        setStatus("uploading");
        const formData = new FormData();
        formData.append("media", file);

        try {
          const res = await fetch("/api/roshan/api/transcribe_files/", {
            method: "POST",
            headers: {
              Authorization: `Token ${import.meta.env.VITE_API_TOKEN}`,
            },
            body: formData,
          });

          if (!res.ok) throw new Error("Failed to upload file to Roshan");

          const data = await res.json();
          console.log("Roshan API Response:", data);

          setAudioUrl(URL.createObjectURL(file));
          setStatus("uploaded");
        } catch (err) {
          console.error("Upload failed:", err);
          setError("ارسال فایل با خطا مواجه شد. لطفاً دوباره امتحان کنید.");
          setStatus("error");
        }
      };

      mediaRecorderRef.current.start();
      setStatus("recording");
    } catch (err) {
      console.error("Microphone error:", err);
      setError("عدم دسترسی به میکروفن.");
      setStatus("error");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
  };

  if (status === "uploading") {
    return (
      <p>
        در حال بارگذاری <br /> لطفا صبر کنید ...
      </p>
    );
  }

  if (status === "uploaded" && audioUrl) {
    return (
      <ShowAudioDetails
        audioUrl={audioUrl}
        onRestart={() => {
          setAudioUrl(null);
          setStatus("idle");
        }}
      />
    );
  }

  if (status === "error") {
    return (
      <div>
        <p style={{ color: "red" }}>{error}</p>
        <button className={styles.restart} onClick={() => setStatus("idle")}>
          تلاش مجدد
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        className={styles.mic}
        onClick={status === "recording" ? stopRecording : startRecording}
      >
        <img src={MicIcon} />
      </button>
      {status === "recording" ? (
        <p>در حال ضبط ...</p>
      ) : (
        <p>
          برای شروع به صحبت، دکمه را فشار دهید
          <br />
          متن پیاده شده آن، در اینجا ظاهر شود
        </p>
      )}
    </>
  );
}
