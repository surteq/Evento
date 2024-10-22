import React, { createContext, useState, useContext } from "react";
import { getNotificationsByUserId } from "@/service/NotificationsService";
import { NotificationData } from "@/service/NotificationData";
import { useUserContext } from "@/app/contexts/UserContext";

interface NotificationsContextType {
  notifications: NotificationData[];
  markAsRead: (id: string) => void;
}

const NotificationsContext = createContext<
  NotificationsContextType | undefined
>(undefined);

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { currentUser } = useUserContext();
  const [notifications, setNotifications] = useState<NotificationData[]>(() => {
    return currentUser ? getNotificationsByUserId(currentUser.id) : [];
  });

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationsContext.Provider value={{ notifications, markAsRead }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotificationsContext = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error(
      "useNotificationsContext must be used within a NotificationsProvider"
    );
  }
  return context;
};
