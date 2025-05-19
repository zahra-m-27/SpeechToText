import DropDown from "../../../Assets/images/dropDown.png";
import { setLanguage } from "../../../Redux/languageSlice";
import styles from "./LanguageSelector.module.css";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function LanguageSelector() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const language = useSelector((state) => state.language.value); // read from store
  const dispatch = useDispatch(); // dispatch to store

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const selectLanguage = (lang) => {
    dispatch(setLanguage(lang)); // update language
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
