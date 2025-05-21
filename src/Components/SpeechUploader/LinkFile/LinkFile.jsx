import { useState } from "react";
import LinkIcon from "../../../Assets/images/linkIconWhite.png";
import styles from "./LinkFile.module.css";
import ShowAudioDetails from "../../ShowAudioDetails/ShowAudioDetails";

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
      const res = await fetch("/api/roshan/api/transcribe_files/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${import.meta.env.VITE_API_TOKEN}`,
        },
        body: JSON.stringify({ media_urls: [url] }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`API ${res.status}: ${text}`);
      }

      const data = await res.json();
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
        <div className={styles.icon} onClick={handleSubmit}>
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
