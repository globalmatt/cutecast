import getConditionName from "./getConditionName";
import RawCurrentWeatherData from "../interfaces/RawCurrentWeatherData";
import CurrentWeatherData from "../interfaces/CurrentWeatherData";

/**
 * Extract useful info from the "current weather" raw data returned from
 * the OpenWeather API.
 *
 * @param {Object} rawData The raw data.
 * @returns {Object} The extracted data.
 */
export default function extractCurrentWeatherData(rawData: RawCurrentWeatherData): CurrentWeatherData {
    return {
        cityName: rawData.name,
        cityId: rawData.id,
        conditionGroup: rawData.weather[0].main,
        conditionCode: rawData.weather[0].id,
        conditionIcon: rawData.weather[0].icon,
        conditionName: getConditionName(
            rawData.weather[0].id,
            Math.round(new Date().getTime() / 1000),
            rawData.sys.sunrise,
            rawData.sys.sunset
        ),
        tempC: rawData.main.temp,
        sunriseUTC: rawData.sys.sunrise,
        sunsetUTC: rawData.sys.sunset,
    };
}
