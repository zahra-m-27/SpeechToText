import UserIcon from "../../Assets/images/userIcon.png";
import DropDownIcon from "../../Assets/images/dropDown.png";
import DropIcon from "../../Assets/images/dropIcon.png";
import ExitIcon from "../../Assets/images/exitIcon.png";
import { useState } from "react";
import "./Header.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="container">
      <div
        className="menuBox"
        style={
          isMenuOpen
            ? { height: "77%", transition: "height 0.3s" }
            : { transition: "height 0.3s" }
        }
      >
        <div className="guest" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <img src={UserIcon} className="userIcon" />
          <span>مهمان</span>
          <img
            src={isMenuOpen ? DropIcon : DropDownIcon}
            className="dropIcon"
          />
        </div>
        <div className="menuContent">
          <div className={`separator ${isMenuOpen ? "visible" : ""}`}></div>
          <div className={`exit ${isMenuOpen ? "visible" : ""}`}>
            <img src={ExitIcon} className="exitIcon" />
            <span>خروج</span>
          </div>
        </div>
      </div>
    </div>
  );
}
