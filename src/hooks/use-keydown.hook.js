import React from "react";

export function useKeyDown(key, doOnKeyDown) {
  React.useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.code === key) {
        doOnKeyDown();
      }
    });

    return () => {
      window.removeEventListener("keydown", doOnKeyDown);
    };
  }, [key, doOnKeyDown]);
}
