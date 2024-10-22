export interface PinData {
  id: string;
  type: "INFO" | "IMAGE" | "LINK" | "AUDIO";
  content: string;
  position: { x: number; y: number };
}

export interface MapData {
  id: string;
  title: string;
  description: string;
  image: any;
  ownerId: string;
  sharedWith: string[];
  pins: PinData[];
}
