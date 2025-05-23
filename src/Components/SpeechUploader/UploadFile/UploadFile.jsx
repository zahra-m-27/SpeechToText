import { useRef, useState } from "react";
import UploadIcon from "../../../Assets/images/uploadIconWhite.png";
import styles from "./UploadFile.module.css";
import ShowAudioDetails from "../../ShowAudioDetails/ShowAudioDetails";
import { transcribeFileAPI } from "../../../API/roshan";
import { addToArchive } from "../../../Redux/archiveSlice";
import { useDispatch } from "react-redux";

export default function UploadFile() {
  const fileInputRef = useRef(null);
  const [status, setStatus] = useState("idle"); // "idle" | "uploading" | "uploaded" | "error"
  const [error, setError] = useState("");
  const [transcript, setTranscript] = useState(null);

  const dispatch = useDispatch();

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
      setTranscript({
        audioUrl: data[0].media_url,
        segments: data[0].segments,
        stats: data[0].stats,
      });

      const newItem = {
        name: file.name || data[0].mediaUrl.split("/").pop()?.split("?")[0],
        date: new Date().toLocaleDateString("fa-IR"),
        type: "." + data[0].media_url?.split(".").pop() || "",
        duration: data[0].duration.replace("0:", ""),
        uploadType: "upload",
        url: data[0].media_url,
        segments: data[0].segments,
        stats: data[0].stats,
      };
      dispatch(addToArchive(newItem));

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

  if (status === "uploaded" && transcript) {
    return (
      <ShowAudioDetails
        audioUrl={transcript.audioUrl}
        segments={transcript.segments}
        onRestart={() => {
          setStatus("idle");
          setTranscript(null);
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
