import React, { createContext, useContext } from "react";
import { toast } from "react-toastify";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const notify = (message, options, type, promise) => {
    switch (type) {
      case "success":
        toast.success(message, options);
        break;
      case "error":
        toast.error(message, options);
        break;
      case "info":
        toast.info(message, options);
        break;
      case "warning":
        toast.warning(message, options);
        break;
      case "promise":
        toast.promise(promise, message, options);
        break;
      default:
        toast(message, options);
    }
    1;
  };

  return <ToastContext.Provider value={notify}>{children}</ToastContext.Provider>;
};

export const useToast = () => {
  return useContext(ToastContext);
};
