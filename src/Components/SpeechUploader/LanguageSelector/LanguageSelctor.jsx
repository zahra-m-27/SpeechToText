import DropDown from "../../../Assets/images/dropDown.png";
import styles from "./LanguageSelector.module.css";
import { useEffect, useRef, useState } from "react";

export default function LanguageSelector() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [language, setLanguage] = useState("persian");
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const selectLanguage = (lang) => {
    setLanguage(lang);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target))
        setIsDropdownOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.main}>
      <span>زبان گفتار:</span>
      <div className={styles.dropDownContainer} ref={dropdownRef}>
        <div className={styles.dropDownHeader} onClick={toggleDropdown}>
          <span>{language == "persian" ? "فارسی" : "انگلیسی"}</span>
          <img src={DropDown} />
        </div>
        {isDropdownOpen && (
          <div className={styles.dropDownList}>
            <div
              onClick={() => {
                selectLanguage("persian");
              }}
            >
              فارسی
            </div>
            <div
              onClick={() => {
                selectLanguage("english");
              }}
            >
              انگلیسی
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
