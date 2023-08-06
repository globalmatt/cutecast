// Types
import ForecastWeatherData from "../interfaces/ForecastWeatherData";
import Forecast from "../interfaces/Forecast";

export default function getForecastsForDay(
    forecastWeatherData: ForecastWeatherData,
    date: Date
): Array<Forecast> {
    const dateUTC = date.getTime() / 1000;

    // Return all forecasts for this day
    return forecastWeatherData.forecasts.filter(
        (f) =>
            f.forecastTimeUTC >= dateUTC && f.forecastTimeUTC < dateUTC + 86400
    );
}
