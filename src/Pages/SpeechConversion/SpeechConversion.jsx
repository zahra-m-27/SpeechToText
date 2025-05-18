import Layout from "../../Components/Layout/Layout";
import SpeechUploader from "../../Components/SpeechUploader/SpeechUploader";
import styles from "./SpeechConversion.module.css";

export default function SpeechConversion() {
  return (
    <Layout>
      <div className={styles.text}>
        <span className={styles.title}>تبدیل گفتار به متن</span>
        <span className={styles.description}>
          آوا با استفاده از هزاران ساعت گفتار با صدای افراد مختلف، <br /> زبان
          فارسی را یاد گرفته است و می‌تواند متن صحبت‌ها را بنویسد.
        </span>
      </div>
      <SpeechUploader />
    </Layout>
  );
}
