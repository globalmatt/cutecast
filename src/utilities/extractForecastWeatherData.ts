import getConditionName from "./getConditionName";
import RawForecastWeatherData from "../interfaces/RawForecastWeatherData";
import ForecastWeatherData from "../interfaces/ForecastWeatherData";

/**
 * Extract useful info from the "forecast weather" raw data returned
 * from the OpenWeather API.
 *
 * @param {Object} rawData The raw data.
 * @returns {Object} The extracted data.
 */
export default function extractForecastWeatherData(rawData: RawForecastWeatherData): ForecastWeatherData {
    const todaySunriseUTC = rawData.city.sunrise;
    const todaySunsetUTC = rawData.city.sunset;
    const tomorrowSunriseUTC = rawData.city.sunrise + 86400; // good-enough approximation
    const tomorrowSunsetUTC = rawData.city.sunset + 86400; // good-enough approximation

    return {
        cityName: rawData.city.name,
        cityId: rawData.city.id,
        forecasts: rawData.list.map((f) => ({
            forecastTimeUTC: f.dt,
            conditionGroup: f.weather[0].main,
            conditionCode: f.weather[0].id,
            conditionIcon: f.weather[0].icon,
            conditionName: getConditionName(
                f.weather[0].id,
                f.dt,
                todaySunriseUTC,
                todaySunsetUTC,
                tomorrowSunriseUTC,
                tomorrowSunsetUTC
            ),
            tempC: f.main.temp,
        })),
    };
}
