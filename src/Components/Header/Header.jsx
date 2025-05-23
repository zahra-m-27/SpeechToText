import UserIcon from "../../Assets/images/userIcon.png";
import DropDownIcon from "../../Assets/images/dropDown.png";
import DropIcon from "../../Assets/images/dropIcon.png";
import ExitIcon from "../../Assets/images/exitIcon.png";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logIn, logOut } from "../../Redux/userSlice";
import { setArchiveData } from "../../Redux/archiveSlice";
import "./Header.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();

  return (
    <div className="container">
      {isLoggedIn ? (
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
            <span>{userInfo.name}</span>
            <img
              src={isMenuOpen ? DropIcon : DropDownIcon}
              className="dropIcon"
            />
          </div>
          <div className="menuContent">
            <div className={`separator ${isMenuOpen ? "visible" : ""}`}></div>
            <div
              className={`exit ${isMenuOpen ? "visible" : ""}`}
              onClick={() => {
                dispatch(logOut());
                setIsMenuOpen(false);
              }}
            >
              <img src={ExitIcon} className="exitIcon" />
              <span>خروج</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="menuBox" style={{ paddingBottom: "16px" }}>
          <div
            className="guest"
            onClick={() => {
              const userData = {
                name: "مهمان",
                password: 1234,
              };
              dispatch(
                logIn({
                  userInfo: {
                    name: userData.name,
                    password: userData.password,
                  },
                })
              );
              dispatch(setArchiveData(userData.archive));
            }}
          >
            <img src={UserIcon} className="userIcon" />
            <span>ورود</span>
          </div>
        </div>
      )}
    </div>
  );
}
