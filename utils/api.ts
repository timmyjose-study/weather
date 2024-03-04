import { WeatherData } from "./types"
import { VISUAL_CROSSING_API_KEY } from '../constants'


const fetchWeather = async (city: string): Promise<WeatherData> => {
  const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${VISUAL_CROSSING_API_KEY}&contentType=json`)
  const data = await response.json()

  return {
    address: data.address,
    temperature: data.days[0].temp,
    description: data.description
  }
}

export default fetchWeather