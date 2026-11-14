"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";

const NotificationContext = createContext({
  message: "",
  type: "success",
  showNotification: () => {},
});

export function NotificationProvider({ children }) {
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");
  const timeoutRef = useRef(null);

  const showNotification = useCallback((msg, notifType = "success") => {
    clearTimeout(timeoutRef.current);

    setMessage(msg);
    setType(notifType);

    timeoutRef.current = setTimeout(() => setMessage(""), 5000);
  }, []);

  return (
    <NotificationContext value={{ message, type, showNotification }}>
      {children}
    </NotificationContext>
  );
}

export const useNotification = () => useContext(NotificationContext);