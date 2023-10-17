import React from "react";
import { useEscapeKey } from "../../hooks/use-escape-key.hook.js";
export const ToastContext = React.createContext();

export function ToastProvider({ children }) {
  const [toastsPropsArray, setToastsPropsArray] = React.useState([]);

  function removeAllToasts() {
    setToastsPropsArray([]);
  }
  useEscapeKey(removeAllToasts);

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
