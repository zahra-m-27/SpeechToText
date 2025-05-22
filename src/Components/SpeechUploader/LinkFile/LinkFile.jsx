import { useState } from "react";
import LinkIcon from "../../../Assets/images/linkIconWhite.png";
import styles from "./LinkFile.module.css";
import ShowAudioDetails from "../../ShowAudioDetails/ShowAudioDetails";
import { transcribeUrlAPI } from "../../../API/roshan";

export default function LinkFile() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("idle"); // "idle" | "uploading" | "uploaded" | "error"
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    setStatus("uploading");
    setErrorMessage("");

    try {
      const data = await transcribeUrlAPI(url);
      console.log("Roshan API response:", data);
      setStatus("uploaded");
    } catch (err) {
      console.error("Error sending link to Roshan:", err);
      setErrorMessage("مشکلی پیش آمد. لطفاً دوباره تلاش کنید.");
      setStatus("error");
    }
  };

  if (status === "uploading") {
    return (
      <p>
        در حال بارگذاری لینک <br />
        لطفا صبر کنید ...
      </p>
    );
  }

  if (status === "uploaded") {
    return (
      <ShowAudioDetails
        audioUrl={url}
        onRestart={() => {
          setUrl("");
          setStatus("idle");
        }}
      />
    );
  }

  if (status === "error") {
    return (
      <div>
        <p style={{ color: "red", marginBottom: "10px" }}>{errorMessage}</p>
        <button className={styles.restart} onClick={() => setStatus("idle")}>
          تلاش مجدد
        </button>
      </div>
    );
  }

  return (
    <>
      <div className={styles.link}>
        <input
          type="text"
          className={styles.input}
          placeholder="example.com/sample.mp3"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <div
          className={styles.icon}
          onClick={url.trim() ? handleSubmit : undefined}
          style={{
            opacity: url.trim() ? 1 : 0.4,
            cursor: url.trim() ? "pointer" : "not-allowed",
          }}
        >
          <img src={LinkIcon} alt="Submit Link" />
        </div>
      </div>
      <p>
        نشانی اینترنتی فایل حاوی گفتار (صوتی/تصویری) را وارد <br />و دکمه را
        فشار دهید
      </p>
    </>
  );
}
