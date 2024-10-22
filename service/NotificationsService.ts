import { NotificationData } from "./NotificationData";
const notifications: NotificationData[] = [];

export const getNotificationsByUserId = (
  userId: string
): NotificationData[] => {
  return notifications.filter(
    (notification) => notification.toUserId === userId
  );
};

export const addNotification = (notification: NotificationData) => {
  notifications.push(notification);
  console.log("Notification added: ", notification);
};
