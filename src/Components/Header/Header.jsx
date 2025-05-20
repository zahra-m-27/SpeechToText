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
                // archive: archiveDataFromSomewhere, // can be fetched or hardcoded for now
                archive: [
                  {
                    name: "khaterate To",
                    date: "1400/08/20",
                    type: ".mp4",
                    duration: "4:38",
                    uploadType: "link",
                  },
                  {
                    name: "https://dls.loudmusic.ir/Music/1401/01/Baraye%20-Shervin ...https://dls.loudmusic.ir/Music/1401/01/Baraye%20-Shervin ...https://dls.loudmusic.ir/Music/1401/01/Baraye%20-Shervin ...https://dls.loudmusic.ir/Music/1401/01/Baraye%20-Shervin ...https://dls.loudmusic.ir/Music/1401/01/Baraye%20-Shervin ...https://dls.loudmusic.ir/Music/1401/01/Baraye%20-Shervin ...",
                    date: "1400/08/20",
                    type: ".wav",
                    duration: "2:14",
                    uploadType: "voice",
                  },
                  {
                    name: "پادکست رادیو راه - فصل دوم - قسمت ششم - راه سروش",
                    date: "1400/08/19",
                    type: ".mp3",
                    duration: "1:28:18",
                    uploadType: "upload",
                  },
                  {
                    name: "Random song",
                    date: "1400/08/19",
                    type: ".mp3",
                    duration: "1:28:18",
                    uploadType: "link",
                  },
                  {
                    name: "https://irsv.upmusics.com/Downloads/Musics/Sirvan%20K ...",
                    date: "1400/08/20",
                    type: ".mp3",
                    duration: "4:39",
                    uploadType: "upload",
                  },
                  {
                    name: "https://irsv.upmusics.com/Downloads/Musics/Sirvan%20K ...",
                    date: "1400/08/20",
                    type: ".mp3",
                    duration: "4:39",
                    uploadType: "upload",
                  },
                  {
                    name: "https://irsv.upmusics.com/Downloads/Musics/Sirvan%20K ...",
                    date: "1400/08/20",
                    type: ".mp3",
                    duration: "4:39",
                    uploadType: "upload",
                  },
                  {
                    name: "https://irsv.upmusics.com/Downloads/Musics/Sirvan%20K ...",
                    date: "1400/08/20",
                    type: ".mp3",
                    duration: "4:39",
                    uploadType: "upload",
                  },
                  {
                    name: "https://irsv.upmusics.com/Downloads/Musics/Sirvan%20K ...",
                    date: "1400/08/20",
                    type: ".mp3",
                    duration: "4:39",
                    uploadType: "upload",
                  },
                  {
                    name: "https://irsv.upmusics.com/Downloads/Musics/Sirvan%20K ...",
                    date: "1400/08/20",
                    type: ".mp3",
                    duration: "4:39",
                    uploadType: "upload",
                  },
                  {
                    name: "https://irsv.upmusics.com/Downloads/Musics/Sirvan%20K ...",
                    date: "1400/08/20",
                    type: ".mp3",
                    duration: "4:39",
                    uploadType: "upload",
                  },
                  {
                    name: "https://irsv.upmusics.com/Downloads/Musics/Sirvan%20K ...",
                    date: "1400/08/20",
                    type: ".mp3",
                    duration: "4:39",
                    uploadType: "upload",
                  },
                  {
                    name: "https://irsv.upmusics.com/Downloads/Musics/Sirvan%20K ...",
                    date: "1400/08/20",
                    type: ".mp3",
                    duration: "4:39",
                    uploadType: "upload",
                  },
                  {
                    name: "https://irsv.upmusics.com/Downloads/Musics/Sirvan%20K ...",
                    date: "1400/08/20",
                    type: ".mp3",
                    duration: "4:39",
                    uploadType: "upload",
                  },
                  {
                    name: "https://irsv.upmusics.com/Downloads/Musics/Sirvan%20K ...",
                    date: "1400/08/20",
                    type: ".mp3",
                    duration: "4:39",
                    uploadType: "upload",
                  },
                  {
                    name: "https://irsv.upmusics.com/Downloads/Musics/Sirvan%20K ...",
                    date: "1400/08/20",
                    type: ".mp3",
                    duration: "4:39",
                    uploadType: "upload",
                  },
                  {
                    name: "https://irsv.upmusics.com/Downloads/Musics/Sirvan%20K ...",
                    date: "1400/08/20",
                    type: ".mp3",
                    duration: "4:39",
                    uploadType: "upload",
                  },
                  {
                    name: "https://irsv.upmusics.com/Downloads/Musics/Sirvan%20K ...",
                    date: "1400/08/20",
                    type: ".mp3",
                    duration: "4:39",
                    uploadType: "upload",
                  },
                  {
                    name: "https://irsv.upmusics.com/Downloads/Musics/Sirvan%20K ...",
                    date: "1400/08/20",
                    type: ".mp3",
                    duration: "4:39",
                    uploadType: "upload",
                  },
                  {
                    name: "https://irsv.upmusics.com/Downloads/Musics/Sirvan%20K ...",
                    date: "1400/08/20",
                    type: ".mp3",
                    duration: "4:39",
                    uploadType: "upload",
                  },
                  {
                    name: "https://irsv.upmusics.com/Downloads/Musics/Sirvan%20K ...",
                    date: "1400/08/20",
                    type: ".mp3",
                    duration: "4:39",
                    uploadType: "upload",
                  },
                  {
                    name: "Random song",
                    date: "1400/08/19",
                    type: ".mp3",
                    duration: "1:28:18",
                  },
                  {
                    name: "khaterate To",
                    date: "1400/08/20",
                    type: ".mp4",
                    duration: "4:38",
                  },
                  {
                    name: "https://dls.loudmusic.ir/Music/1401/01/Baraye%20-Shervin ...",
                    date: "1400/08/20",
                    type: ".wav",
                    duration: "2:14",
                  },
                  {
                    name: "پادکست رادیو راه - فصل دوم - قسمت ششم - راه سروش",
                    date: "1400/08/19",
                    type: ".mp3",
                    duration: "1:28:18",
                  },
                  {
                    name: "Random song",
                    date: "1400/08/19",
                    type: ".mp3",
                    duration: "1:28:18",
                  },
                  {
                    name: "https://irsv.upmusics.com/Downloads/Musics/Sirvan%20K ...",
                    date: "1400/08/20",
                    type: ".mp3",
                    duration: "4:39",
                  },
                  {
                    name: "khaterate To",
                    date: "1400/08/20",
                    type: ".mp4",
                    duration: "4:38",
                  },
                  {
                    name: "https://dls.loudmusic.ir/Music/1401/01/Baraye%20-Shervin ...",
                    date: "1400/08/20",
                    type: ".wav",
                    duration: "2:14",
                  },
                  {
                    name: "پادکست رادیو راه - فصل دوم - قسمت ششم - راه سروش",
                    date: "1400/08/19",
                    type: ".mp3",
                    duration: "1:28:18",
                  },
                  {
                    name: "https://irsv.upmusics.com/Downloads/Musics/Sirvan%20K ...",
                    date: "1400/08/20",
                    type: ".mp3",
                    duration: "4:39",
                  },
                  {
                    name: "khaterate To",
                    date: "1400/08/20",
                    type: ".mp4",
                    duration: "4:38",
                  },
                  {
                    name: "https://dls.loudmusic.ir/Music/1401/01/Baraye%20-Shervin ...",
                    date: "1400/08/20",
                    type: ".wav",
                    duration: "2:14",
                  },
                  {
                    name: "پادکست رادیو راه - فصل دوم - قسمت ششم - راه سروش",
                    date: "1400/08/19",
                    type: ".mp3",
                    duration: "1:28:18",
                  },
                  {
                    name: "Random song",
                    date: "1400/08/19",
                    type: ".mp3",
                    duration: "1:28:18",
                  },
                ],
              };
              dispatch(
                logIn({
                  userInfo: {
                    name: userData.name,
                    password: userData.password,
                  },
                  archive: userData.archive,
                })
              );
              dispatch(setArchiveData(userData.archive));
            }}
            // onClick={async () => {
            //   const userInfo = { name: "Ali", email: "ali@example.com" };
            //   const archiveFromAPI = await fetchUserArchive(userInfo.email);

            //   dispatch(logIn({ userInfo, archive: archiveFromAPI }));
            //   dispatch(setArchiveData(archiveFromAPI));
            // }}
          >
            <img src={UserIcon} className="userIcon" />
            <span>ورود</span>
          </div>
        </div>
      )}
    </div>
  );
}
