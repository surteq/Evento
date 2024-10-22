export interface NotificationData {
  id: string;
  message: string;
  timestamp: Date;
  type: "map_share";
  fromUserId: string;
  toUserId: string;
  mapId?: string;
}
