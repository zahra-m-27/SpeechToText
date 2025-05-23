import { useState } from "react";
import LinkIcon from "../../../Assets/images/linkIconWhite.png";
import styles from "./LinkFile.module.css";
import ShowAudioDetails from "../../ShowAudioDetails/ShowAudioDetails";
import { transcribeUrlAPI } from "../../../API/roshan";
import { addToArchive } from "../../../Redux/archiveSlice";
import { useDispatch } from "react-redux";

export default function LinkFile() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("idle"); // "idle" | "uploading" | "uploaded" | "error"
  const [errorMessage, setErrorMessage] = useState("");
  const [transcript, setTranscript] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    setStatus("uploading");
    setErrorMessage("");

    try {
      const data = await transcribeUrlAPI(url);
      console.log("Roshan API response:", data);
      setTranscript({
        audioUrl: data[0].media_url,
        segments: data[0].segments,
        stats: data[0].stats,
      });
      const newItem = {
        name: url || data[0].mediaUrl.split("/").pop()?.split("?")[0],
        date: new Date().toLocaleDateString("fa-IR"),
        type: "." + data[0].media_url?.split(".").pop() || "",
        duration: data[0].duration.replace("0:", ""),
        uploadType: "link",
        url: data[0].media_url,
        segments: data[0].segments,
        stats: data[0].stats,
      };
      dispatch(addToArchive(newItem));

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
        audioUrl={transcript.audioUrl}
        segments={transcript.segments}
        onRestart={() => {
          setUrl("");
          setStatus("idle");
          setTranscript(null);
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
