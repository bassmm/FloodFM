export interface FloodDataResponse {
  latitude: number;
  longitude: number;
  daily: {
    time: Date[];
    river_discharge: number[];
  };
}

export interface FloodAPIParams {
  latitude: number[];
  longitude: number[];
  daily: string;
  past_days: number;
  forecast_days: number;
}
