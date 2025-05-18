import styles from "./SidebarOption.module.css";

export default function SidebarOption({ icon, text, isSelected, onCLick }) {
  let style;
  if (isSelected) {
    style = { backgroundColor: "#02816E" };
  }
  return (
    <div style={style} className={styles.main} onClick={onCLick}>
      <img src={icon} />
      <div className={styles.title}>{text}</div>
    </div>
  );
}
