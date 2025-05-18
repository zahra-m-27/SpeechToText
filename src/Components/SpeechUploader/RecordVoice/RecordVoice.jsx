import MicIcon from "../../../Assets/images/micIconWhite.png";
import styles from "./RecordVoice.module.css";

export default function RecordVoice() {
  return (
    <>
      <button className={styles.mic}>
        <img src={MicIcon} />
      </button>
      <p>
        برای شروع به صحبت، دکمه را فشار دهید
        <br />
        متن پیاده شده آن، در اینجا ظاهر شود
      </p>
    </>
  );
}
