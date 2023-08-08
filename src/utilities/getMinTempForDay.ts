// Types
import ForecastWeatherData from "../interfaces/ForecastWeatherData";

// Helper functions
import getForecastsForDay from "./getForecastsForDay";

/**
 * Get the minimum temperature forecasted for a given date.
 *
 * @param {Date} date - The date for which to get the min temp
 *
 * @param {ForecastWeatherData} forecastWeatherData - The forecast
 * weather data
 *
 * @returns {number} The min temp
 */
export default function getMinTempForDay(
    date: Date,
    forecastWeatherData: ForecastWeatherData
): number {
    const forecastsForDay = getForecastsForDay(forecastWeatherData, date);

    // Calculate the min temp
    return forecastsForDay
        .map((f) => f.tempC)
        .reduce((min, cur) => Math.min(min, cur), Infinity);
}
