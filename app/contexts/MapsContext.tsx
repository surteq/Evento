import React, { createContext, useState, useContext, useEffect } from "react";
import { MapData, PinData } from "@/service/MapData";
import { MockMapService } from "@/service/MockMapService"; // Import your service
import { useUserContext } from "@/app/contexts/UserContext";
import { addNotification } from "@/service/NotificationsService";

interface MapsContextType {
  maps: MapData[]; // Use MapData consistently
  addMap: (map: MapData) => void;
  updateMap: (updatedMap: MapData) => void;
  updateMapPins: (mapId: string, pins: PinData[]) => void;
  shareMapWithUser: (mapId: string, userId: string) => void;
}

const MapsContext = createContext<MapsContextType | undefined>(undefined);

export const MapsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { currentUser } = useUserContext();
  const mockMapService = new MockMapService();

  // const [maps, setMaps] = useState<MapData[]>(() => {
  //   const defaultMaps = currentUser
  //     ? mockMapService.getMapsByOwner(currentUser.id)
  //     : [];
  //   return defaultMaps.map((map: MapData) => ({
  //     id: map.id,
  //     title: map.title,
  //     description: map.description,
  //     image: map.image,
  //     pins: map.pins as PinData[],
  //     ownerId: map.ownerId,
  //     sharedWith: map.sharedWith || [],
  //   }));
  // });
  const [maps, setMaps] = useState<MapData[]>([]);

  useEffect(() => {
    if (currentUser) {
      const defaultMaps = mockMapService.getMapsByOwner(currentUser.id);
      setMaps(defaultMaps);
    }
  }, [currentUser]);

  const addMap = (map: MapData) => {
    setMaps((prevMaps) => [map, ...prevMaps]);
  };

  const updateMap = (updatedMap: MapData) => {
    setMaps((prevMaps) =>
      prevMaps.map((map) => (map.id === updatedMap.id ? updatedMap : map))
    );
  };

  const updateMapPins = (mapId: string, pins: PinData[]) => {
    setMaps((prevMaps) =>
      prevMaps.map((map) =>
        map.id === mapId ? { ...map, pins: [...pins] } : map
      )
    );
  };

  const shareMapWithUser = (mapId: string, userId: string) => {
    if (currentUser) {
      console.log("Attempting to share map with:", userId);

      const result = mockMapService.shareMapWithUser(
        mapId,
        userId,
        currentUser,
        addNotification
      );

      if (result) {
        console.log(`Map shared successfully with user: ${userId}`);
      } else {
        console.log(`Failed to share the map with user: ${userId}`);
      }

      setMaps([...maps]);
    } else {
      console.log("No current user found.");
    }
  };

  return (
    <MapsContext.Provider
      value={{ maps, addMap, updateMap, updateMapPins, shareMapWithUser }}
    >
      {children}
    </MapsContext.Provider>
  );
};

export const useMapsContext = () => {
  const context = useContext(MapsContext);
  if (!context) {
    throw new Error("useMapsContext must be used within a MapsProvider");
  }
  return context;
};
