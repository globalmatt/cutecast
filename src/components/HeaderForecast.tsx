// Vendors
import React from "react";
import PropTypes from "prop-types";
import CurrentWeatherData from "../interfaces/CurrentWeatherData";

interface HeaderForecastProps {
    currentWeatherData: CurrentWeatherData;
    isVisible: boolean;
}

/**
 * The header for the "Forecast" page.
 *
 * Renders the "Forecast" page header, including the city name.
 *
 * @returns {ReactElement} The `<HeaderForecast />` component.
 */
export default function HeaderForecast({
    currentWeatherData,
    isVisible,
}: HeaderForecastProps) {
    return (
        <div
            className={"header-forecast" + (isVisible ? " visible" : " hidden")}
        >
            <h1>{currentWeatherData.cityName} Forecast</h1>
        </div>
    );
}

HeaderForecast.propTypes = {
    /** The current weather data. */
    currentWeatherData: PropTypes.shape({
        cityName: PropTypes.string,
    }),
};
