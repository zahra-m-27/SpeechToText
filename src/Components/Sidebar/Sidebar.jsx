import styles from "./Sidebar.module.css";
import SpeechIcon from "../../Assets/images/SpeechIcon.png";
import ArchiveIcon from "../../Assets/images/ArchiveIcon.png";
import SidebarIcon from "../../Assets/images/SidebarIcon.png";
import { useState } from "react";
import SidebarOption from "./SidebarOptions/SidebarOptions";

export default function Sidebar() {
  const [isArchive, setIsArchive] = useState(false);
  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <img src={SidebarIcon} />
        <span>آوا</span>
      </div>
      <div className={styles.options}>
        <SidebarOption
          text="تبدیل گفتار"
          icon={SpeechIcon}
          onCLick={() => setIsArchive(false)}
          isSelected={isArchive ? false : true}
        />
        <SidebarOption
          text="آرشیو"
          icon={ArchiveIcon}
          onCLick={() => setIsArchive(true)}
          isSelected={isArchive ? true : false}
        />
      </div>
    </div>
  );
}
