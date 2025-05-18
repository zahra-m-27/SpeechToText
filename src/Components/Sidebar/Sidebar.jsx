import styles from "./Sidebar.module.css";
import SpeechIcon from "../../Assets/images/SpeechIcon.png";
import ArchiveIcon from "../../Assets/images/ArchiveIcon.png";
import SidebarIcon from "../../Assets/images/SidebarIcon.png";
import SidebarOption from "./SidebarOptions/SidebarOptions";
import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isArchive = location.pathname === "/archive";

  return (
    <div className={styles.main}>
      <div className={styles.title} onClick={() => navigate("/")}>
        <img src={SidebarIcon} />
        <span>آوا</span>
      </div>
      <div className={styles.options}>
        <SidebarOption
          text="تبدیل گفتار"
          icon={SpeechIcon}
          onCLick={() => navigate("/")}
          isSelected={!isArchive}
        />
        <SidebarOption
          text="آرشیو"
          icon={ArchiveIcon}
          onCLick={() => navigate("/archive")}
          isSelected={isArchive}
        />
      </div>
    </div>
  );
}
