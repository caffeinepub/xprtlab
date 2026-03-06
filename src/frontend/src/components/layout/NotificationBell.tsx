import { Bell } from "lucide-react";
import React, { useState } from "react";
import { useNotifications } from "../../hooks/useNotifications";
import NotificationDrawer from "./NotificationDrawer";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const { unreadCount } = useNotifications();

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>
      <NotificationDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
