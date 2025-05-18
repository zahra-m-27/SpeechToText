import LinkIcon from "../../../Assets/images/linkIconWhite.png";
import styles from "./LinkFile.module.css";

export default function LinkFile() {
  return (
    <>
      <button className={styles.link}>
        <p>example.com/sample.mp3</p>
        <div className={styles.icon}>
          <img src={LinkIcon} />
        </div>
      </button>
      <p>
        نشانی اینترنتی فایل حاوی گفتار (صوتی/تصویری) را وارد <br /> و دکمه را
        فشار دهید
      </p>
    </>
  );
}
