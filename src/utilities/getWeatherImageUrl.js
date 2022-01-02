import config from "../config.json";
import weatherImages from "../weatherImages.json";
import isDaytime from "./isDaytime";

// Get a random suitable image to represent the current weather

export default function getWeatherImageUrl(currentWeatherData) {
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
    //console.log(suitableImages);
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
