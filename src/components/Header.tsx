// Vendors
import React from "react";
import PropTypes from "prop-types";
import CurrentWeatherData from "../interfaces/CurrentWeatherData";

interface HeaderProps {
    currentWeatherData: CurrentWeatherData;
}

/**
 * The header for the "Current Weather" page.
 *
 * Renders the "Current Weather" page header, including the city name
 * and current condition/temperature.
 *
 * @returns {ReactElement} The `<Header />` component.
 */
export default function Header({ currentWeatherData }: HeaderProps) {
    return (
        <div className="header">
            <h1>{currentWeatherData.cityName}</h1>
            <h2>
                {currentWeatherData.conditionName},{" "}
                {Math.round(currentWeatherData.tempC)}&deg;
            </h2>
        </div>
    );
}

Header.propTypes = {
    /** The current weather data. */
    currentWeatherData: PropTypes.shape({
        cityName: PropTypes.string,
        conditionName: PropTypes.string,
        tempC: PropTypes.number,
    }),
};
