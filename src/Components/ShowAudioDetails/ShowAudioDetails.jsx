import DownloadIcon from "../../Assets/images/downloadIcon.png";
import CopyIcon from "../../Assets/images/copyIcon.png";
import RestartIcon from "../../Assets/images/restartIcon.png";
import TextIcon from "../../Assets/images/textIcon.png";
import TimeIcon from "../../Assets/images/timeIcon.png";
import styles from "./ShowAudioDetails.module.css";
import { useRef, useState } from "react";
import AudioPlayer from "./AudioPlayer/AudioPlayer";
import { useSelector } from "react-redux";

export default function ShowAudioDetails({ iconsStyle, separatorStyle }) {
  const [activeTab, setActiveTab] = useState("simple");
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);
  const language = useSelector((state) => state.language.value);

  const transcriptData = [
    { start: "0", end: "3", label: "[با]" },
    { start: "3", end: "6", label: "[---]" },
    { start: "6", end: "8", label: "[---]" },
    { start: "8", end: "12", label: "[با]" },
    { start: "12", end: "14", label: "و[---]" },
    { start: "14", end: "16", label: "[---]" },
  ];

  const handleJump = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      // audioRef.current.play();
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${mins}:${secs}`;
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span
          className={activeTab == "simple" ? styles.active : ""}
          onClick={() => setActiveTab("simple")}
        >
          <img src={TextIcon} alt="text icon" />
          متن ساده
          <div className={styles.underline}></div>
        </span>
        <span
          className={activeTab == "timed" ? styles.active : ""}
          onClick={() => setActiveTab("timed")}
        >
          <img src={TimeIcon} />
          متن زمان‌بندی شده
          <div className={styles.underline}></div>
        </span>
        <div className={styles.left} style={iconsStyle}>
          <img src={DownloadIcon} className={styles.download} />
          <img src={CopyIcon} className={styles.copy} />
          <button>
            <img src={RestartIcon} className={styles.restart} />
            شروع دوباره
          </button>
        </div>
      </div>
      <div className={styles.separator} style={separatorStyle}></div>
      {activeTab == "simple" ? (
        <div className={styles.test}>
          <div className={styles.textContainer}>
            <p
              style={
                language == "english"
                  ? { textAlign: "left" }
                  : { textAlign: "right" }
              }
            >
              [با][---][---] [با] و[---][---] [با][---][---][---][---] کجایی تو
              [خوش] می دیدی من خسته شدم [ما را] [به] این [زودی] چه جوری شد [عشق
              شدی] به این است[---] [آخرش] سی با فکر [و] چقدر [نزار می خوام] که
              [چشم تو] [و با رفت][---][---][---][---][---][---][---][---] سخت
              [آرام] ولی ازت می خوام[---] بر نگردی هر کسی که به [تو] باشه[---]
              کاشکی تو منو [بردی] [که چشمک][---] با[---][---][---][---][---]
              [ابو][---] [با] و و و و و [او] [با][---][---] [با] و[---][---]
              [با][---][---][---][---] کجایی تو [خوش] می دیدی من خسته شدم [ما
              را] [به] این [زودی] چه جوری شد [عشق شدی] به این است[---] [آخرش] سی
              با فکر [و] چقدر [نزار می خوام] که [چشم تو] [و با
              رفت][---][---][---][---][---][---][---][---] سخت [آرام] ولی ازت می
              خوام[---] بر نگردی هر کسی که به [تو] باشه[---] کاشکی تو منو [بردی]
              [که چشمک][---] با[---][---][---][---][---] [ابو][---] [با] و و و و
              و [او] [با][---][---] [با] و[---][---] [با][---][---][---][---]
              کجایی تو [خوش] می دیدی من خسته شدم [ما را] [به] این [زودی] چه جوری
              شد [عشق شدی] به این است[---] [آخرش] سی با فکر [و] چقدر [نزار می
              خوام] که [چشم تو] [و با
              رفت][---][---][---][---][---][---][---][---] سخت [آرام] ولی ازت می
              خوام[---] بر نگردی هر کسی که به [تو] باشه[---] کاشکی تو منو [بردی]
              [که چشمک][---] با[---][---][---][---][---] [ابو][---] [با] و و و و
              و [او] [با][---][---] [با] و[---][---] [با][---][---][---][---]
              کجایی تو [خوش] می دیدی من خسته شدم [ما را] [به] این [زودی] چه جوری
              شد [عشق شدی] به این است[---] [آخرش] سی با فکر [و] چقدر [نزار می
              خوام] که [چشم تو] [و با
              رفت][---][---][---][---][---][---][---][---] سخت [آرام] ولی ازت می
              خوام[---] بر نگردی هر کسی که به [تو] باشه[---] کاشکی تو منو [بردی]
              [که چشمک][---] با[---][---][---][---][---] [ابو][---] [با] و و و و
              و [او] [با][---][---] [با] و[---][---] [با][---][---][---][---]
              کجایی تو [خوش] می دیدی من خسته شدم [ما را] [به] این [زودی] چه جوری
              شد [عشق شدی] به این است[---] [آخرش] سی با فکر [و] چقدر [نزار می
              خوام] که [چشم تو] [و با
              رفت][---][---][---][---][---][---][---][---] سخت [آرام] ولی ازت می
              خوام[---] بر نگردی هر کسی که به [تو] باشه[---] کاشکی تو منو [بردی]
              [که چشمک][---] با[---][---][---][---][---] [ابو][---] [با] و و و و
              و [او] [با][---][---] [با] و[---][---] [با][---][---][---][---]
              کجایی تو [خوش] می دیدی من خسته شدم [ما را] [به] این [زودی] چه جوری
              شد [عشق شدی] به این است[---] [آخرش] سی با فکر [و] چقدر [نزار می
              خوام] که [چشم تو] [و با
              رفت][---][---][---][---][---][---][---][---] سخت [آرام] ولی ازت می
              خوام[---] بر نگردی هر کسی که به [تو] باشه[---] کاشکی تو منو [بردی]
              [که چشمک][---] با[---][---][---][---][---] [ابو][---] [با] و و و و
              و [او] [با][---][---] [با] و[---][---] [با][---][---][---][---]
              کجایی تو [خوش] می دیدی من خسته شدم [ما را] [به] این [زودی] چه جوری
              شد [عشق شدی] به این است[---] [آخرش] سی با فکر [و] چقدر [نزار می
              خوام] که [چشم تو] [و با
              رفت][---][---][---][---][---][---][---][---] سخت [آرام] ولی ازت می
              خوام[---] بر نگردی هر کسی که به [تو] باشه[---] کاشکی تو منو [بردی]
              [که چشمک][---] با[---][---][---][---][---] [ابو][---] [با] و و و و
              و [او]
            </p>
          </div>
          <AudioPlayer
            audioRef={audioRef}
            setCurrentTime={setCurrentTime}
            audioSrc="http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3"
          />
        </div>
      ) : (
        <div className={styles.test}>
          <ul className={styles.transcriptContainer}>
            {transcriptData.map((item, index) => {
              const isActive =
                currentTime >= item.start && currentTime < item.end;

              return (
                <li
                  onClick={() => handleJump(item.start)}
                  className={isActive ? styles.activeRow : null}
                  key={index}
                >
                  <span>{formatTime(item.end)}</span>
                  <span>{formatTime(item.start)}</span>
                  <span className={styles.label}>{item.label}</span>
                </li>
              );
            })}
          </ul>
          <AudioPlayer
            audioRef={audioRef}
            setCurrentTime={setCurrentTime}
            audioSrc="http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3"
          />
        </div>
      )}
    </div>
  );
}
