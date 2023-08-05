// Config
import RawCurrentWeatherData from "../interfaces/RawCurrentWeatherData";
import RawForecastWeatherData from "../interfaces/RawForecastWeatherData";
import config from "../config.json";
const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;

/**
 * Retrieve the raw current and forecast weather data from the
 * OpenWeather API.
 *
 * @param {Number} lastWeatherFetchTime When the data was last fetched
 * (in UTC). Used to throttle the API calls.
 *
 * @returns {[RawCurrentWeatherData, RawForecastWeatherData] | boolean}
 * The current and forecast raw data, or false if the fetching was
 * throttled.
 */
export default async function fetchWeatherData(
    lastWeatherFetchTime: number
): Promise<[RawCurrentWeatherData, RawForecastWeatherData] | boolean> {
    // Throttle the weather data fetching.
    const currentTime = new Date().getTime();

    if (
        currentTime - lastWeatherFetchTime <
        config.weatherFetchInterval * 1000
    ) {
        console.warn("not fetching weather - throttled");
        return false;
    }

    // Get current weather by city.
    const currentWeatherRequestUrl = `${config.weatherApiUrl}${config.weatherApiCurrentUrl}Robertson,NSW,AU&units=metric&appid=${weatherApiKey}`;
    const currentWeather = await fetch(currentWeatherRequestUrl);

    if (!currentWeather.ok) {
        throw Error(currentWeather.status.toString());
    }

    const currentWeatherDataRaw: RawCurrentWeatherData =
        await currentWeather.json();

    // Get forecast weather by city.
    const forecastWeatherRequestUrl = `${config.weatherApiUrl}${config.weatherApiForecastUrl}Robertson,NSW,AU&units=metric&appid=${weatherApiKey}`;
    const forecastWeather = await fetch(forecastWeatherRequestUrl);

    if (!forecastWeather.ok) {
        throw Error(forecastWeather.status.toString());
    }

    const forecastWeatherDataRaw: RawForecastWeatherData =
        await forecastWeather.json();
    return [currentWeatherDataRaw, forecastWeatherDataRaw];
}
