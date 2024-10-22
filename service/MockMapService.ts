import { MapData, PinData } from "./MapData";
import { NotificationData } from "./NotificationData";
import { UserData } from "./UserData";
const image = require("@/assets/images/map.png");
export class MockMapService {
  private maps: MapData[] = [];

  constructor() {
    this.maps = [
      {
        id: "1",
        title: "Concert",
        description: "sample map",
        ownerId: "user_2iCBKk2rRhjrqrSngxOHs6V9yao",
        sharedWith: ["user_2nnhYPDcbtseO9VRPKFobqAzT7q"],
        image: image,
        pins: [
          {
            id: "p1",
            type: "INFO",
            content: "Main Stage",
            position: { x: 150, y: 300 },
          },
        ],
      },
    ];
  }

  getMapsByOwner(userId: string): MapData[] {
    return this.maps.filter((map) => map.ownerId === userId);
  }

  getMapsSharedWith(userId: string): MapData[] {
    return this.maps.filter((map) => map.sharedWith.includes(userId));
  }
  shareMapWithUser(
    mapId: string,
    userId: string,
    currentUser: UserData,
    addNotification: (notification: NotificationData) => void
  ): boolean {
    const map = this.maps.find((m) => m.id === mapId);
    if (map && !map.sharedWith.includes(userId)) {
      map.sharedWith.push(userId);

      addNotification({
        id: Date.now().toString(),
        message: `${currentUser.username} shared a map with you.`,
        timestamp: new Date(),
        type: "map_share",
        fromUserId: currentUser.id,
        toUserId: userId,
        mapId,
      });

      return true;
    }
    return false;
  }

  allowEditing(mapId: string, userId: string): boolean {
    const map = this.maps.find((m) => m.id === mapId);
    if (map && map.sharedWith.includes(userId)) {
      return true;
    }
    return false;
  }

  addMap(newMap: MapData): void {
    this.maps.push(newMap);
  }

  updateMap(updatedMap: MapData): void {
    this.maps = this.maps.map((map) =>
      map.id === updatedMap.id ? updatedMap : map
    );
  }
}
