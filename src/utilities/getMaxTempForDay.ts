// Types
import ForecastWeatherData from "../interfaces/ForecastWeatherData";

// Helper functions
import getForecastsForDay from "./getForecastsForDay";

/**
 * Get the maximum temperature forecasted for a given date.
 *
 * @param {Date} date - The date for which to get the max temp
 *
 * @param {ForecastWeatherData} forecastWeatherData - The forecast
 * weather data
 *
 * @returns {number} The max temp
 */
export default function getMaxTempForDay(
    date: Date,
    forecastWeatherData: ForecastWeatherData
): number {
    const forecastsForDay = getForecastsForDay(forecastWeatherData, date);

    // Calculate the max temp
    return forecastsForDay
        .map((f) => f.tempC)
        .reduce((max, cur) => Math.max(max, cur), -Infinity);
}
