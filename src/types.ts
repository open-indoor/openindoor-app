export interface Map {
  center: [number, number];
  pitch: number;
  maxPitch: number;
  bearing: number;
  zoom: number;
  country: string;
  building: string;
  floor: string;
}

export interface MapState {
  map: Map;
}
