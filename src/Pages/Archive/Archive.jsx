import { useState } from "react";
import "./Archive.css";
import DownloadIcon from "../../Assets/images/downloadIcon.png";
import CopyIcon from "../../Assets/images/copyIcon.png";
import DeleteIconGray from "../../Assets/images/deleteIconGray.png";
import DeleteIconWhite from "../../Assets/images/deleteIconWhite.png";
import WordIcon from "../../Assets/images/wordIcon.png";
import LinkIcon from "../../Assets/images/linkIconWhite.png";
import UploadIcon from "../../Assets/images/uploadIconWhite.png";
import MicIcon from "../../Assets/images/micIconWhite.png";
import CopyIconHovered from "../../Assets/images/copyIconHovered.png";
import Layout from "../../Components/Layout/Layout";
import ShowAudioDetails from "../../Components/ShowAudioDetails/ShowAudioDetails";
import Pagination from "../../Components/Pagination/Pagination";

export default function Archive() {
  const [expandedRow, setExpandedRow] = useState(null);
  const [page, setPage] = useState(1);
  const [hoveredDeleteIndex, setHoveredDeleteIndex] = useState(null);
  const [hoveredCopyIndex, setHoveredCopyIndex] = useState(null);

  const data = [
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
  ];
  const ITEMS_PER_PAGE = 8;

  const pageCount = Math.ceil(data.length / ITEMS_PER_PAGE);
  const handleRowClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const getIconByUploadType = (type) => {
    switch (type) {
      case "link":
        return LinkIcon;
      case "upload":
        return UploadIcon;
      case "voice":
        return MicIcon;
      default:
        return UploadIcon;
    }
  };

  const paginatedData = data.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <Layout>
      <div className="archive-container">
        <p className="pageTitle">آرشیو من</p>
        <div className="archive-header">
          <div></div>
          <div>نام فایل</div>
          <div>تاریخ بارگذاری</div>
          <div>نوع فایل</div>
          <div>مدت زمان</div>
          <div></div>
        </div>

        {paginatedData.map((file, index) => {
          const isExpanded = expandedRow === index;

          let uploadIconStyle = {};
          let imgStyle = {};

          if (file.uploadType === "link") {
            uploadIconStyle = { backgroundColor: "#FF1654" };
            imgStyle = { width: "13px", height: "14px" };
          } else if (file.uploadType === "voice") {
            uploadIconStyle = { backgroundColor: "#40C6B8" };
            imgStyle = { width: "11px", height: "19px" };
          } else {
            uploadIconStyle = { backgroundColor: "#118AD3" };
            imgStyle = { width: "16px", height: "13px" };
          }

          return (
            <div
              key={index}
              className={`archive-row-wrapper ${isExpanded ? "expanded" : ""}`}
            >
              <div className="archive-row">
                <div className="upload-icon" style={uploadIconStyle}>
                  <img
                    style={imgStyle}
                    src={getIconByUploadType(file.uploadType)}
                    alt="upload"
                  />
                </div>
                {file.uploadType == "link" ? (
                  <div onClick={() => handleRowClick(index)}>
                    <a className="title link">{file.name}</a>
                  </div>
                ) : (
                  <div onClick={() => handleRowClick(index)} className="title">
                    {file.name}
                  </div>
                )}

                <div className="date">{file.date}</div>
                <div className="type">{file.type}</div>
                <div className="duration">{file.duration}</div>

                <div className="icons">
                  <div className="downloadIcon">
                    <img src={DownloadIcon} alt="download" />
                    <div className="tooltip">۳.۱۸ مگابایت</div>
                  </div>
                  <div>
                    <img src={WordIcon} alt="word" className="wordIcon" />
                  </div>
                  <div
                    onMouseEnter={() => setHoveredCopyIndex(index)}
                    onMouseLeave={() => setHoveredCopyIndex(null)}
                  >
                    <img
                      className="copyIcon"
                      alt="copy"
                      src={
                        hoveredCopyIndex === index ? CopyIconHovered : CopyIcon
                      }
                    />
                  </div>
                  <div
                    className="deleteIcon"
                    onMouseEnter={() => setHoveredDeleteIndex(index)}
                    onMouseLeave={() => setHoveredDeleteIndex(null)}
                  >
                    <img
                      src={
                        hoveredDeleteIndex === index
                          ? DeleteIconWhite
                          : DeleteIconGray
                      }
                    />
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="archive-details">
                  <ShowAudioDetails
                    iconsStyle={{ display: "none" }}
                    separatorStyle={{ width: "26%", margin: "17px 0 15px" }}
                  />
                </div>
              )}
            </div>
          );
        })}

        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: "360px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Pagination
              currentPage={page}
              pageCount={pageCount}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
