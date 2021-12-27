// Vendors
import React, { useContext } from "react";

// Components
import HeaderForecast from "../components/HeaderForecast";
import Footer from "../components/Footer";
import CurrentWeatherImage from "../components/CurrentWeatherImage";
import { Context } from "../Context";

// Helper functions
import {
    isDaytime,
    getMidnightTodayUTC,
    getIconImage,
} from "../utilities/weatherFunctions";

/**
 * The Forecast page.
 *
 * Renders the Forecast page, comprising the header, weather forecast,
 * and footer.
 *
 * @returns {ReactElement} The `<Current />` component.
 */
export default function Forecast() {
    const { currentWeatherData, currentWeatherImageUrl, forecastWeatherData } =
        useContext(Context);

    const currentTimeUTC = Math.round(new Date().getTime() / 1000);
    const next24HoursForecasts = forecastWeatherData.forecasts.filter(
        (f) => f.forecastTimeUTC < currentTimeUTC + 86400
    );

    function getHour(timeUTC) {
        return new Date(timeUTC * 1000)
            .toLocaleString([], { hour: "numeric", hour12: true })
            .replace(/\s/g, "");
    }

    function getForecastsForDay(date) {
        const dateUTC = date.getTime() / 1000;

        // Return all forecasts for this day
        return forecastWeatherData.forecasts.filter(
            (f) =>
                f.forecastTimeUTC >= dateUTC &&
                f.forecastTimeUTC < dateUTC + 86400
        );
    }

    function getModalConditionIconForDay(date) {
        const forecastsForDay = getForecastsForDay(date);
        let midnightTodayUTC = getMidnightTodayUTC();
        const daysAfterToday = Math.round(
            (date.getTime() / 1000 - midnightTodayUTC.getTime() / 1000) / 86400
        );

        // Calculate the frequencies of each condition icon
        // and store in an object ( {'01d': 3, '04d': 5, ...} )
        const conditionFrequencies = forecastsForDay.reduce(function (
            allConditions,
            f
        ) {
            // (Skip night-time conditions since we generally assume
            // the daily forecast is for the daytime)
            if (
                isDaytime(
                    f.forecastTimeUTC,
                    currentWeatherData.sunriseUTC + 86400 * daysAfterToday,
                    currentWeatherData.sunsetUTC + 86400 * daysAfterToday,
                    currentWeatherData.sunriseUTC +
                        86400 * (daysAfterToday + 1),
                    currentWeatherData.sunsetUTC + 86400 * (daysAfterToday + 1)
                )
            ) {
                if (f.conditionIcon in allConditions) {
                    allConditions[f.conditionIcon]++;
                } else {
                    allConditions[f.conditionIcon] = 1;
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
        return modalConditionIcon;
    }

    function getMaxTempForDay(date) {
        const forecastsForDay = getForecastsForDay(date);

        // Calculate the max temp
        return forecastsForDay
            .map((f) => f.tempC)
            .reduce((max, cur) => Math.max(max, cur), -Infinity);
    }

    function getMinTempForDay(date) {
        const forecastsForDay = getForecastsForDay(date);

        // Calculate the max temp
        return forecastsForDay
            .map((f) => f.tempC)
            .reduce((min, cur) => Math.min(min, cur), Infinity);
    }

    function getDailyForecasts() {
        let date = getMidnightTodayUTC();
        const dailyForecasts = [];
        for (let i = 1; i <= 4; i++) {
            date.setDate(date.getDate() + 1);
            dailyForecasts.push({
                weekday: new Intl.DateTimeFormat("en-US", {
                    weekday: "long",
                }).format(date),
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
                <HeaderForecast currentWeatherData={currentWeatherData} />
                <CurrentWeatherImage
                    currentWeatherImageUrl={currentWeatherImageUrl}
                />
                <div className="forecast">
                    <ul className="threehour">
                        <li key="now">
                            <span className="time">Now</span>
                            <span className="icon">
                                {getIconImage(currentWeatherData.conditionIcon)}
                            </span>
                            <span className="temp">
                                {Math.round(currentWeatherData.tempC)}&deg;
                            </span>
                        </li>
                        {next24HoursForecasts.map((f, i) => (
                            <li key={i}>
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
                                    <td className="weekday">{f.weekday}</td>
                                    <td className="icon">
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
                <Footer />
            </div>
        </div>
    );
}
