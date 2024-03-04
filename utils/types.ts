export type WeatherType =
  | 'Clear'
  | 'Hail'
  | "Heavy Cloud"
  | 'Light Cloud'
  | 'Light Rain'
  | 'Showers'
  | 'Sleet'
  | 'Snow'
  | 'Thunder'

export interface FetchWeatherResponse {
  location: string;
  weather: WeatherType;
  temperature: number;
}