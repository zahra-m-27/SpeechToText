import { useState } from "react";
import UploadIcon from "../../../Assets/images/uploadIconWhite.png";
import styles from "./UploadFile.module.css";
import ShowAudioDetails from "../../ShowAudioDetails/ShowAudioDetails";

export default function UploadFile() {
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  return (
    <>
      {isFileUploaded ? (
        <ShowAudioDetails />
      ) : (
        <>
          <button className={styles.file}>
            <img src={UploadIcon} />
          </button>
          <p>
            برای بارگذاری فایل گفتاری (صوتی/تصویری)، دکمه را فشار دهید <br />
            متن پیاده شده آن، در اینجا ظاهر می شود
          </p>
        </>
      )}
    </>
  );
}
