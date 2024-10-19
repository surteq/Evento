// Wspólny interfejs dla wszystkich pinezek
export interface BasePin {
  id: string;
  coordinates: { x: number; y: number };
}

// Pinezka informacyjna
export interface InfoPin extends BasePin {
  type: "info";
  description: string;
}

// Pinezka ze zdjęciem
export interface ImagePin extends BasePin {
  type: "image";
  imageUri: string;
}

// Pinezka z odnośnikiem
export interface LinkPin extends BasePin {
  type: "link";
  url: string;
}

// Typ łączący wszystkie rodzaje pinezek
export type Pin = InfoPin | ImagePin | LinkPin;
