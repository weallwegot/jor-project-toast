import React from "react";

import Button from "../Button";
import { ToastContext } from "../ToastProvider";
import ToastShelf from "../ToastShelf";

import styles from "./ToastPlayground.module.css";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];
const DEFAULT_TTL = 10000;

function ToastPlayground() {
  const [messageText, setMessageText] = React.useState("");
  const [variantChoice, setVariantChoice] = React.useState(VARIANT_OPTIONS[0]);
  const [timeToLive, setTimeToLive] = React.useState(DEFAULT_TTL);
  const { toastsPropsArray, addToast } = React.useContext(ToastContext);

  function handleFormSubmit(e) {
    e.preventDefault();

    addToast({
      variant: variantChoice,
      message: messageText,
      timeToLive: timeToLive,
    });

    setMessageText("");
    setVariantChoice(VARIANT_OPTIONS[0]);
    setTimeToLive(DEFAULT_TTL);
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      {<ToastShelf toastsPropsArray={toastsPropsArray} />}

      <form onSubmit={handleFormSubmit} className={styles.controlsWrapper}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              className={styles.messageInput}
              value={messageText}
              onChange={(e) => {
                setMessageText(e.target.value);
              }}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((vo) => (
              <label key={vo} htmlFor={`variant-${vo}`}>
                <input
                  id={`variant-${vo}`}
                  type="radio"
                  name="variant"
                  value={vo}
                  checked={variantChoice === vo}
                  onChange={(e) => setVariantChoice(e.target.value)}
                />
                {vo}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <label
            htmlFor="ttl"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Time To Live
          </label>
          <div className={styles.inputWrapper}>
            <input
              type="range"
              id="ttl"
              min={5000}
              max={35000}
              step={500}
              className={styles.messageInput}
              value={timeToLive}
              onChange={(e) => {
                setTimeToLive(e.target.value);
              }}
            />
            <p>{timeToLive / 1000} Seconds</p>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
