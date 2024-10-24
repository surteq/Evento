import React, { createContext, useState, useContext, useEffect } from "react";
import { NotificationData } from "@/service/NotificationData";
import {
  addNotification as addNotificationToService,
  getNotificationsByUserId,
} from "@/service/NotificationsService"; // Importuj funkcję z NotificationsService
import { useUserContext } from "@/app/contexts/UserContext"; // Importuj UserContext

interface NotificationsContextType {
  notifications: NotificationData[];
  addNotification: (notification: NotificationData) => void;
  markAsRead: (id: string) => void;
}

const NotificationsContext = createContext<
  NotificationsContextType | undefined
>(undefined);

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const { currentUser } = useUserContext();

  useEffect(() => {
    if (currentUser) {
      const fetchNotifications = () => {
        const userNotifications = getNotificationsByUserId(currentUser.id);
        console.log("Fetched notifications for user:", userNotifications);
        setNotifications(userNotifications);
      };

      // Odświeżanie co 10 sekund
      const intervalId = setInterval(fetchNotifications, 10000);

      // Wyczyść interwał, gdy komponent jest odmontowany
      return () => clearInterval(intervalId);
    }
  }, [currentUser]);

  const addNotification = (notification: NotificationData) => {
    setNotifications((prev) => [...prev, notification]);
    addNotificationToService(notification);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationsContext.Provider
      value={{ notifications, addNotification, markAsRead }}
    >
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
