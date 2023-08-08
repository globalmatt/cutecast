// Types
import ForecastWeatherData from "../interfaces/ForecastWeatherData";
import Forecast from "../interfaces/Forecast";

/**
 * Given the forecast weather data and the current time in UTC, return
 * the next 24 hours of forecasts.
 *
 * @param {ForecastWeatherData} forecastWeatherData - The forecast
 * weather data
 *
 * @param  {number} currentTimeUTC - The current time in UTC, as a Unix
 * timestamp
 *
 * @returns {Forecast[]} - The next 24 hours of forecasts
 */
export default function getNext24HoursForecasts(
    forecastWeatherData: ForecastWeatherData,
    currentTimeUTC: number
): Forecast[] {
    return forecastWeatherData.forecasts.filter(
        (f) =>
            f.forecastTimeUTC > currentTimeUTC &&
            f.forecastTimeUTC < currentTimeUTC + 86400
    );
}
