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

  // return (
  //   <ol className={styles.wrapper}>
  //     <li className={styles.toastWrapper}>
  //       <Toast variant="notice">Example notice toast</Toast>
  //     </li>
  //     <li className={styles.toastWrapper}>
  //       <Toast variant="error">Example error toast</Toast>
  //     </li>
  //   </ol>
  // );
}

export default ToastShelf;
