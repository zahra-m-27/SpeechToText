import { useState } from "react";
import LinkIcon from "../../../Assets/images/linkIconWhite.png";
import styles from "./LinkFile.module.css";
import SendIcon from "../../../Assets/images/sendIcon.png";

export default function LinkFile() {
  const [url, setUrl] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    alert("Link submitted: " + url);
    setUrl("");
  };

  return (
    <>
      <div className={`${styles.link} ${isFocused ? styles.focused : ""}`}>
        <button className={styles.submit} onClick={handleSubmit}>
          <img src={SendIcon} />
        </button>
        <input
          type="text"
          className={styles.input}
          placeholder="example.com/sample.mp3"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <div className={styles.icon}>
          <img src={LinkIcon} alt="Submit Link" />
        </div>
      </div>
      <p>
        نشانی اینترنتی فایل حاوی گفتار (صوتی/تصویری) را وارد <br /> و دکمه را
        فشار دهید
      </p>
    </>
  );
}
