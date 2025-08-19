import styles from "./NotFoundPage.module.css";
import { Navigate } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className={styles.wrap}>
      <Navigate to="/" replace />
    </div>
  );
}
