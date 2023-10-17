import React from "react";
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from "react-feather";

import VisuallyHidden from "../VisuallyHidden";
import { ToastContext } from "../ToastProvider";

import styles from "./Toast.module.css";

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

function Toast({
  variant = "notice",
  message = "16 photos uploaded",
  timeToLive,
  id,
}) {
  const DynamicHTML = ICONS_BY_VARIANT[variant];
  const variantStyleClassName = styles[variant];
  const { setToastsPropsArray, removeToast } = React.useContext(ToastContext);

  React.useEffect(() => {
    if (!timeToLive) {
      return;
    }

    const disappearanceFunction = window.setTimeout(() => {
      console.log(`running disappearanceFunction on ${id}`);
      setToastsPropsArray((toasts) => {
        const nextToasts = toasts.filter((obj) => {
          return obj.id !== id;
        });
        return nextToasts;
      });
    }, timeToLive);

    return () => {
      window.clearTimeout(disappearanceFunction);
    };
  }, [timeToLive, id, setToastsPropsArray]);

  return (
    <>
      <div className={`${styles.toast} ${variantStyleClassName}`}>
        <div className={styles.iconContainer}>
          <DynamicHTML size={24} />
        </div>
        <p className={styles.content}>
          <VisuallyHidden>
            {variant} {"-"}{" "}
          </VisuallyHidden>
          {message}
        </p>
        <button
          aria-label="Dismiss message"
          aria-live="off"
          className={styles.closeButton}
        >
          <X onClick={() => removeToast({ id })} size={24} />
        </button>
      </div>
    </>
  );
}

export default Toast;
