import { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { fetchArchiveFromAPI, goToPage } from "../../Redux/archiveSlice";

export default function Archive() {
  const [expandedRow, setExpandedRow] = useState(null);
  const [hoveredDeleteIndex, setHoveredDeleteIndex] = useState(null);
  const [hoveredCopyIndex, setHoveredCopyIndex] = useState(null);
  const dispatch = useDispatch();
  const archiveState = useSelector((state) => state.archive);
  const paginatedData = archiveState.data;

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

  const handlePageChange = (pageNum) => {
    dispatch(goToPage(pageNum));
  };

  function formatDuration(duration) {
    if (!duration || typeof duration !== "string") return "00:00";

    const parts = duration.split(":");
    if (parts.length < 3) return duration;

    let [hours, minutes, rest] = parts;
    hours = parseInt(hours, 10);
    minutes = minutes.padStart(2, "0");
    let seconds = rest.split(".")[0].padStart(2, "0");

    return hours > 0
      ? `${hours.toString().padStart(2, "0")}:${minutes}:${seconds}`
      : `${minutes}:${seconds}`;
  }

  useEffect(() => {
    dispatch(fetchArchiveFromAPI());
  }, [dispatch]);

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
              <div
                className="archive-row"
                style={isExpanded ? { paddingBottom: 0 } : null}
              >
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
                <div className="duration">{formatDuration(file.duration)}</div>

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
                    audioUrl={file.url}
                    segments={file.segments}
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
              currentPage={archiveState.currentPage}
              pageCount={archiveState.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
