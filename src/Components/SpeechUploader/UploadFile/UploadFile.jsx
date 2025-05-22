import { useRef, useState } from "react";
import UploadIcon from "../../../Assets/images/uploadIconWhite.png";
import styles from "./UploadFile.module.css";
import ShowAudioDetails from "../../ShowAudioDetails/ShowAudioDetails";
import { transcribeFileAPI } from "../../../API/roshan";

export default function UploadFile() {
  const fileInputRef = useRef(null);
  const [status, setStatus] = useState("idle"); // "idle" | "uploading" | "uploaded" | "error"
  const [audioUrl, setAudioUrl] = useState(null);
  const [error, setError] = useState("");

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setStatus("uploading");
    setError("");

    try {
      const data = await transcribeFileAPI(file);
      console.log("Roshan API Response:", data);

      // Use local URL for playback
      setAudioUrl(URL.createObjectURL(file));
      setStatus("uploaded");
    } catch (err) {
      console.error("Error:", err);
      setError("ارسال فایل با خطا مواجه شد. لطفاً دوباره امتحان کنید.");
      setStatus("error");
    }
  };

  if (status === "uploading") {
    return (
      <p>
        در حال بارگذاری فایل <br />
        لطفا صبر کنید ...
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
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept="audio/*,video/*"
      />
      <button className={styles.file} onClick={handleButtonClick}>
        <img src={UploadIcon} />
      </button>
      <p>
        برای بارگذاری فایل گفتاری (صوتی/تصویری)، دکمه را فشار دهید
        <br />
        متن پیاده شده آن، در اینجا ظاهر می شود
      </p>
    </>
  );
}
