import { useState, useRef } from "react";
import UploadIcon from "../../../Assets/images/uploadIconWhite.png";
import styles from "./UploadFile.module.css";
import ShowAudioDetails from "../../ShowAudioDetails/ShowAudioDetails";

export default function UploadFile() {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    if (file) {
      setSelectedFile(file);
    }

    //use cloudinary to upload files and get a link so that link can be sent to backend
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "SpeechTest");
    formData.append("cloud_name", "dik8zqi6k");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dik8zqi6k/auto/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      console.log("Cloudinary response:", data);
      setFileUrl(data.secure_url);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <>
      {fileUrl ? (
        <ShowAudioDetails
          audioUrl={fileUrl}
          onRestart={() => {
            setFileUrl(null);
            setSelectedFile(null);
          }}
        />
      ) : (
        <>
          {selectedFile ? (
            <>
              <p>
                در حال بارگذاری فایل <br />
                لطفا صبر کنید ...
              </p>
            </>
          ) : (
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
                برای بارگذاری فایل گفتاری (صوتی/تصویری)، دکمه را فشار دهید{" "}
                <br />
                متن پیاده شده آن، در اینجا ظاهر می شود
              </p>
            </>
          )}
        </>
      )}
    </>
  );
}
