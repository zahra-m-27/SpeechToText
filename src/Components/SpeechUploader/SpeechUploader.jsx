import GrayMicIcon from "../../Assets/images/micIconGray.png";
import GrayUploadIcon from "../../Assets/images/uploadIconGray.png";
import GrayLinkIcon from "../../Assets/images/linkIconGray.png";
import WhiteMicIcon from "../../Assets/images/micIconWhite.png";
import WhiteUploadIcon from "../../Assets/images/uploadIconWhite.png";
import WhiteLinkIcon from "../../Assets/images/linkIconWhite.png";
import styles from "./SpeechUploader.module.css";
import { useState } from "react";
import RecordVoice from "./RecordVoice/RecordVoice";
import UploadFile from "./UploadFile/UploadFile";
import LinkFile from "./LinkFile/LinkFile";
import LanguageSelector from "./LanguageSelector/LanguageSelctor";

export default function SpeechUploader() {
  const [isRecord, setIsRecord] = useState(true);
  const [isUpload, setIsUpload] = useState(false);
  const [isLink, setIsLink] = useState(false);

  let mainContent;
  let style;

  if (isRecord) {
    mainContent = <RecordVoice />;
    style = { borderColor: "#00BA9F", borderTopRightRadius: 0 };
  } else if (isUpload) {
    mainContent = <UploadFile />;
    style = { borderColor: "#118AD3" };
  } else if (isLink) {
    mainContent = <LinkFile />;
    style = { borderColor: "#FF1654" };
  }

  return (
    <div className={styles.main}>
      <div>
        <div className={styles.voiceSelection}>
          <button
            className={isRecord ? styles.voice : ""}
            onClick={() => {
              setIsRecord(true);
              setIsLink(false);
              setIsUpload(false);
            }}
          >
            <img
              src={isRecord ? WhiteMicIcon : GrayMicIcon}
              className={styles.micIcon}
            />
            ضبط صدا
          </button>
          <button
            className={isUpload ? styles.upload : ""}
            onClick={() => {
              setIsRecord(false);
              setIsLink(false);
              setIsUpload(true);
            }}
          >
            <img
              src={isUpload ? WhiteUploadIcon : GrayUploadIcon}
              className={styles.uploadIcon}
            />
            بارگذاری فایل
          </button>
          <button
            className={isLink ? styles.link : ""}
            onClick={() => {
              setIsRecord(false);
              setIsLink(true);
              setIsUpload(false);
            }}
          >
            <img
              src={isLink ? WhiteLinkIcon : GrayLinkIcon}
              className={styles.linkIcon}
            />
            لینک
          </button>
        </div>
        <section className={styles.content} style={style}>
          {mainContent}
        </section>
      </div>
      <LanguageSelector />
    </div>
  );
}
