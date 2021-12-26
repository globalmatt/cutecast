import React from "react";

export default function HeaderForecast({ currentWeatherData }) {
    return (
        <div className="header-forecast">
            <h1>{currentWeatherData.cityName} Forecast</h1>
        </div>
    );
}
