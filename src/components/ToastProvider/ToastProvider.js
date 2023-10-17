import React from "react";
import { useKeyDown } from "../../hooks/use-keydown.hook.js";
export const ToastContext = React.createContext();

export function ToastProvider({ children }) {
  const [toastsPropsArray, setToastsPropsArray] = React.useState([]);

  function removeAllToasts() {
    setToastsPropsArray([]);
  }
  useKeyDown("Escape", removeAllToasts);

  const value = React.useMemo(() => {
    function addToast({ message, variant, timeToLive }) {
      setToastsPropsArray([
        ...toastsPropsArray,
        {
          message: message,
          variant: variant,
          timeToLive: timeToLive,
          id: Math.random(),
        },
      ]);
    }

    function removeToast({ id }) {
      const newToastsPropsArray = toastsPropsArray.filter((obj) => {
        return obj.id !== id;
      });
      setToastsPropsArray(newToastsPropsArray);
    }

    return {
      toastsPropsArray,
      addToast,
      removeToast,
      setToastsPropsArray,
    };
  }, [toastsPropsArray]);

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export default ToastProvider;
