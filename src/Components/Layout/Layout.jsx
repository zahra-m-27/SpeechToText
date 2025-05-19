import { useSelector } from "react-redux";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./Layout.module.css";

export default function Layout({ children }) {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header />
        {isLoggedIn ? (
          children
        ) : (
          <>
            <p style={{ fontSize: "25px", margin: "20px" }}>
              لطفا ابتدا وارد شوید!
            </p>
          </>
        )}
      </div>
    </div>
  );
}
