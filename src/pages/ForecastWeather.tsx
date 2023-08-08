// Vendors
import React, { useContext } from "react";

// Types

// Components
import HeaderForecast from "../components/HeaderForecast";
import Footer from "../components/Footer";
import CurrentWeatherImage from "../components/CurrentWeatherImage";
import { Context } from "../Context";

// Helper functions
import getIconImage from "../utilities/getIconImage";
import getNext24HoursForecasts from "../utilities/getNext24HoursForecasts";
import getHour from "../utilities/getHour";
import getDailyForecasts from "../utilities/getDailyForecasts";
import getMidnightTodayUTC from "../utilities/getMidnightTodayUTC";

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

    const next24HoursForecasts = getNext24HoursForecasts(
        forecastWeatherData,
        currentTimeUTC
    );

    const dailyForecasts = getDailyForecasts(
        getMidnightTodayUTC(),
        currentWeatherData,
        forecastWeatherData
    );

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
                            {dailyForecasts.map((f, i) => (
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
