import React from "react";

export function useEscapeKey(doOnEscapeDown) {
  React.useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.code === "Escape") {
        doOnEscapeDown();
      }
    });

    return () => {
      window.removeEventListener("keydown", doOnEscapeDown);
    };
  }, [doOnEscapeDown]);
}
