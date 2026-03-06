import { useState } from "react";

export interface Notification {
  id: string;
  message: string;
  type:
    | "info"
    | "warning"
    | "success"
    | "error"
    | "booking"
    | "task"
    | "report"
    | "incident"
    | "alert";
  timestamp: number;
  read: boolean;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const addNotification = (
    message: string,
    type: Notification["type"] = "info",
  ) => {
    const n: Notification = {
      id: `${Date.now()}-${Math.random()}`,
      message,
      type,
      timestamp: Date.now(),
      read: false,
    };
    setNotifications((prev) => [n, ...prev].slice(0, 20));
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => setNotifications([]);

  return {
    notifications,
    unreadCount,
    addNotification,
    markAllRead,
    removeNotification,
    clearAll,
  };
}
