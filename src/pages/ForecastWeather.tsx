// Vendors
import React, { useContext } from "react";

// Types
import Forecast from "../interfaces/Forecast";
import DailyForecast from "../interfaces/DailyForecast";

// Components
import HeaderForecast from "../components/HeaderForecast";
import Footer from "../components/Footer";
import CurrentWeatherImage from "../components/CurrentWeatherImage";
import { Context } from "../Context";

// Helper functions
import getIconImage from "../utilities/getIconImage";
import getMidnightTodayUTC from "../utilities/getMidnightTodayUTC";
import isDaytime from "../utilities/isDaytime";
import getForecastsForDay from "../utilities/getForecastsForDay";

/**
 * The Forecast page.
 *
 * Renders the Forecast page, comprising the header, weather forecast,
 * and footer.
 *
 * @returns {ReactElement} The `<ForecastWeather />` component.
 */
export default function ForecastWeather() {
    const { currentWeatherData, currentWeatherImageUrl, forecastWeatherData } =
        useContext(Context);

    const [chromeVisible, setChromeVisible] = React.useState(true);

    if (!forecastWeatherData.forecasts) {
        return null;
    }

    const currentTimeUTC = Math.round(new Date().getTime() / 1000);
    const next24HoursForecasts = forecastWeatherData.forecasts.filter(
        (f) =>
            f.forecastTimeUTC > currentTimeUTC &&
            f.forecastTimeUTC < currentTimeUTC + 86400
    );

    function getHour(timeUTC: number): string {
        return new Date(timeUTC * 1000)
            .toLocaleString([], { hour: "numeric", hour12: true })
            .replace(/\s/g, "");
    }

    function getModalConditionIconForDay(date: Date): string {
        const forecastsForDay = getForecastsForDay(forecastWeatherData, date);
        let midnightTodayUTC = getMidnightTodayUTC();
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
                    currentWeatherData.sunriseUTC +
                        86400 * (daysAfterToday + 1),
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

    function getMaxTempForDay(date: Date) {
        const forecastsForDay = getForecastsForDay(forecastWeatherData, date);

        // Calculate the max temp
        return forecastsForDay
            .map((f) => f.tempC)
            .reduce((max, cur) => Math.max(max, cur), -Infinity);
    }

    function getMinTempForDay(date: Date) {
        const forecastsForDay = getForecastsForDay(forecastWeatherData, date);

        // Calculate the max temp
        return forecastsForDay
            .map((f) => f.tempC)
            .reduce((min, cur) => Math.min(min, cur), Infinity);
    }

    function getDailyForecasts(): DailyForecast[] {
        let date = getMidnightTodayUTC();
        const dailyForecasts = [];
        for (let i = 1; i <= 4; i++) {
            date.setDate(date.getDate() + 1);
            dailyForecasts.push({
                weekday: new Intl.DateTimeFormat("en-US", {
                    weekday: "long",
                }).format(date),
                conditionName: "", // TODO: Get condition name
                conditionIcon: getModalConditionIconForDay(date),
                maxTempC: getMaxTempForDay(date),
                minTempC: getMinTempForDay(date),
            });
        }

        return dailyForecasts;
    }

    return (
        <div style={{ textAlign: "center" }}>
            <div id="content">
                <HeaderForecast
                    currentWeatherData={currentWeatherData}
                    isVisible={chromeVisible}
                />
                <CurrentWeatherImage
                    currentWeatherImageUrl={currentWeatherImageUrl}
                    onClick={() => setChromeVisible(!chromeVisible)}
                />
                <div
                    className={
                        "forecast" + (chromeVisible ? " visible" : " hidden")
                    }
                    onClick={() => setChromeVisible(!chromeVisible)}
                >
                    <ul className="threehour">
                        <li key="now" aria-label="Now">
                            <span className="time">Now</span>
                            <span className="icon">
                                {getIconImage(currentWeatherData.conditionIcon)}
                            </span>
                            <span className="temp">
                                {Math.round(currentWeatherData.tempC)}&deg;
                            </span>
                        </li>
                        {next24HoursForecasts.map((f, i) => (
                            <li key={i} aria-label={getHour(f.forecastTimeUTC)}>
                                <span className="time">
                                    {getHour(f.forecastTimeUTC)}
                                </span>
                                <span className="icon">
                                    {getIconImage(f.conditionIcon)}
                                </span>
                                <span className="temp">
                                    {Math.round(f.tempC)}&deg;
                                </span>
                            </li>
                        ))}
                    </ul>

                    <table className="daily">
                        <tbody>
                            {getDailyForecasts().map((f, i) => (
                                <tr key={i}>
                                    <th className="weekday">{f.weekday}</th>
                                    <td
                                        className="icon"
                                        aria-label={f.conditionName}
                                    >
                                        {f.conditionName}
                                        {getIconImage(f.conditionIcon)}
                                    </td>
                                    <td className="maxTemp">
                                        {Math.round(f.maxTempC)}&deg;
                                    </td>
                                    <td className="minTemp">
                                        {Math.round(f.minTempC)}&deg;
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Footer isVisible={chromeVisible} />
            </div>
        </div>
    );
}
