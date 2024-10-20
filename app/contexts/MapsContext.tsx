import React, { createContext, useState, useContext } from "react";

interface Pin {
  id: string;
  type: "INFO" | "IMAGE" | "LINK" | "AUDIO";
  content: string;
  position: { x: number; y: number };
}

interface Map {
  id: string;
  title: string;
  description: string;
  image: string;
  pins: Pin[];
}

interface MapsContextType {
  maps: Map[];
  addMap: (map: Map) => void;
  updateMap: (updatedMap: Map) => void;
  updateMapPins: (mapId: string, pins: Pin[]) => void;
}

const MapsContext = createContext<MapsContextType | undefined>(undefined);

export const MapsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [maps, setMaps] = useState<Map[]>([]);

  const addMap = (map: Map) => {
    setMaps((prevMaps) => [map, ...prevMaps]);
  };

  const updateMap = (updatedMap: Map) => {
    setMaps((prevMaps) =>
      prevMaps.map((map) => (map.id === updatedMap.id ? updatedMap : map))
    );
  };

  const updateMapPins = (mapId: string, pins: Pin[]) => {
    setMaps((prevMaps) =>
      prevMaps.map((map) =>
        map.id === mapId ? { ...map, pins: [...pins] } : map
      )
    );
  };

  return (
    <MapsContext.Provider value={{ maps, addMap, updateMap, updateMapPins }}>
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
