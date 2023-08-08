// Types
import Forecast from "../interfaces/Forecast";
import CurrentWeatherData from "../interfaces/CurrentWeatherData";
import ForecastWeatherData from "../interfaces/ForecastWeatherData";

// Helper functions
import getMidnightTodayUTC from "./getMidnightTodayUTC";
import isDaytime from "./isDaytime";
import getForecastsForDay from "./getForecastsForDay";

/**
 * Given a date, the current weather data, and the forecast weather
 * data, return the most common condition icon for that day.
 *
 * @param {Date} date - The date for which to get the modal condition
 * icon
 *
 * @param {CurrentWeatherData} currentWeatherData - The current weather
 * data
 *
 * @param {ForecastWeatherData} forecastWeatherData - The forecast
 * weather data
 *
 * @returns {string} The modal condition icon
 */
export default function getModalConditionIconForDay(
    date: Date,
    currentWeatherData: CurrentWeatherData,
    forecastWeatherData: ForecastWeatherData
): string {
    const forecastsForDay = getForecastsForDay(forecastWeatherData, date);
    const midnightTodayUTC = getMidnightTodayUTC();
    const daysAfterToday = Math.round(
        (date.getTime() / 1000 - midnightTodayUTC.getTime() / 1000) / 86400
    );

    // Calculate the frequencies of each condition icon
    // and store in an object ( {'01d': 3, '04d': 5, ...} )
    const conditionFrequencies = forecastsForDay.reduce(function (
        allConditions: { [key: string]: number },
        forecast: Forecast
    ) {
        // (Skip night-time conditions since we generally assume
        // the daily forecast is for the daytime)
        if (
            isDaytime(
                forecast.forecastTimeUTC,
                currentWeatherData.sunriseUTC + 86400 * daysAfterToday,
                currentWeatherData.sunsetUTC + 86400 * daysAfterToday,
                currentWeatherData.sunriseUTC + 86400 * (daysAfterToday + 1),
                currentWeatherData.sunsetUTC + 86400 * (daysAfterToday + 1)
            )
        ) {
            if (forecast.conditionIcon in allConditions) {
                allConditions[forecast.conditionIcon]++;
            } else {
                allConditions[forecast.conditionIcon] = 1;
            }
        }

        return allConditions;
    },
    {});

    // Find the modal condition icon
    let modalConditionIcon = null;
    let modalConditionFreq = 0;

    Object.keys(conditionFrequencies).forEach((ci) => {
        if (conditionFrequencies[ci] > modalConditionFreq) {
            modalConditionIcon = ci;
            modalConditionFreq = conditionFrequencies[ci];
        }
    });

    if (modalConditionIcon === null) {
        throw new Error("No modal condition icon found");
    } else {
        return modalConditionIcon;
    }
}
