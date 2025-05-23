import { useState, useRef } from "react";
import MicIcon from "../../../Assets/images/micIconWhite.png";
import ShowAudioDetails from "../../ShowAudioDetails/ShowAudioDetails";
import styles from "./RecordVoice.module.css";
import { transcribeFileAPI } from "../../../API/roshan";
import { useDispatch } from "react-redux";
import { addToArchive } from "../../../Redux/archiveSlice";

export default function RecordVoice() {
  const [status, setStatus] = useState("idle"); // idle | recording | uploading | uploaded | error
  const [error, setError] = useState("");
  const [transcript, setTranscript] = useState(null);

  const dispatch = useDispatch();

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
        //prevents mic from staying active in the browser after recording is done
        stream.getTracks().forEach((track) => track.stop());
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const file = new File([blob], "recording.webm", { type: "audio/webm" });

        setStatus("uploading");

        try {
          const data = await transcribeFileAPI(file);
          console.log("Roshan API Response:", data[0]);
          const newItem = {
            name: file.name || data[0].mediaUrl.split("/").pop()?.split("?")[0],
            date: new Date().toLocaleDateString("fa-IR"),
            type: "." + data[0].media_url?.split(".").pop() || "",
            duration: data[0].duration.replace("0:", ""),
            uploadType: "voice",
            url: data[0].media_url,
            segments: data[0].segments,
            stats: data[0].stats,
          };
          dispatch(addToArchive(newItem));

          setTranscript({
            audioUrl: data[0].media_url,
            segments: data[0].segments,
            stats: data[0].stats,
          });
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

  if (status === "uploaded" && transcript) {
    return (
      <ShowAudioDetails
        audioUrl={transcript.audioUrl}
        segments={transcript.segments}
        onRestart={() => {
          setTranscript(null);
          setStatus("idle");
          setError("");
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
