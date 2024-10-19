import React, { createContext, useState, useContext } from "react";

interface Map {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface MapsContextType {
  maps: Map[];
  addMap: (map: Map) => void;
}

const MapsContext = createContext<MapsContextType | undefined>(undefined);

export const MapsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [maps, setMaps] = useState<Map[]>([]);

  const addMap = (map: Map) => {
    setMaps((prevMaps) => [map, ...prevMaps]);
  };

  return (
    <MapsContext.Provider value={{ maps, addMap }}>
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
