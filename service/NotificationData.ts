export interface NotificationData {
  id: string;
  message: string;
  timestamp: Date;
  type: "map_share" | "friend_request" | "self_action";
  fromUserId: string;
  toUserId: string;
  mapId?: string;
}
