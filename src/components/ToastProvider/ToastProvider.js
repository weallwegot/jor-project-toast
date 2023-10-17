import React from "react";

export const ToastContext = React.createContext();

export function ToastProvider({ children }) {
  const [toastsPropsArray, setToastsPropsArray] = React.useState([]);

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

    function removeAllToasts() {
      setToastsPropsArray([]);
    }

    return {
      toastsPropsArray,
      addToast,
      removeToast,
      removeAllToasts,
      setToastsPropsArray,
    };
  }, [toastsPropsArray]);

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export default ToastProvider;
