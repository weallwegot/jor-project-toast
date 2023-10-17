import React from "react";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";
import VisuallyHidden from "../VisuallyHidden";

function ToastShelf({
  toastsPropsArray = [{ variant: "notice", message: "testing" }],
}) {
  return (
    <ol
      role="region"
      aria-live="polite"
      aria-label="Notification"
      className={styles.wrapper}
    >
      {toastsPropsArray?.map((toastProps) => (
        <li key={toastProps.id} className={styles.toastWrapper}>
          <Toast {...toastProps} />
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
