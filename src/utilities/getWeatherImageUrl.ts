import config from "../config.json";
import weatherImages from "../weatherImages.json";
import isDaytime from "./isDaytime";
import CurrentWeatherData from "../interfaces/CurrentWeatherData";

/**
 * Get a random suitable image to represent the current weather.
 *
 * Usually this will pretty much match the condition name returned by
 * the OpenWeather API. The main (only?) exception is that the "Clear"
 * (800) condition's name is "Sunny" during daylight hours.
 *
 * @param {Object} currentWeatherData - The current weather data.
 * @returns {String} The URL of the selected weather image.
 */
export default function getWeatherImageUrl(
    currentWeatherData: CurrentWeatherData
): string | null {
    const suitableImages = weatherImages.filter(
        (i) =>
            i.conditionCodes.includes(currentWeatherData.conditionCode) &&
            i.daytime ===
                isDaytime(
                    Math.round(new Date().getTime() / 1000),
                    currentWeatherData.sunriseUTC,
                    currentWeatherData.sunsetUTC
                )
    );

    if (suitableImages.length > 0) {
        return (
            config.imagesUrl +
            "/" +
            suitableImages[Math.floor(Math.random() * suitableImages.length)]
                .url
        );
    } else {
        return null;
    }
}
