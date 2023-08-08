// Vendors

// Types
import DailyForecast from "../interfaces/DailyForecast";
import CurrentWeatherData from "../interfaces/CurrentWeatherData";
import ForecastWeatherData from "../interfaces/ForecastWeatherData";

// Helper functions
import getModalConditionIconForDay from "./getModalConditionIconForDay";
import getMaxTempForDay from "./getMaxTempForDay";
import getMinTempForDay from "./getMinTempForDay";

/**
 * Given the current date, the current weather data, and the forecast
 * weather data, return the daily forecasts for the next 4 days.
 *
 * @param {Date} date - The current date
 *
 * @param {CurrentWeatherData} currentWeatherData - The current weather
 * data
 *
 * @param {ForecastWeatherData} forecastWeatherData - The forecast
 * weather data
 *
 * @returns {DailyForecast[]} The daily forecasts
 */
export default function getDailyForecasts(
    date: Date,
    currentWeatherData: CurrentWeatherData,
    forecastWeatherData: ForecastWeatherData
): DailyForecast[] {
    const dailyForecasts = [];
    const currentDate = new Date(date);

    for (let i = 1; i <= 4; i++) {
        currentDate.setDate(currentDate.getDate() + 1);
        dailyForecasts.push({
            weekday: new Intl.DateTimeFormat("en-US", {
                weekday: "long",
            }).format(currentDate),
            conditionName: "",
            conditionIcon: getModalConditionIconForDay(
                currentDate,
                currentWeatherData,
                forecastWeatherData
            ),
            maxTempC: getMaxTempForDay(currentDate, forecastWeatherData),
            minTempC: getMinTempForDay(currentDate, forecastWeatherData),
        });
    }

    return dailyForecasts;
}
