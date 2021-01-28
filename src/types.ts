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

export interface MapQuery {
  country: string;
  long: string;
  lat: string;
  zoom: string;
  bearing: string;
  pitch: string;
  floor?: string;
  building?: string;
}
