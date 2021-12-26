import React, { useState, useLayoutEffect } from "react";

export default function CurrentWeatherImage({ currentWeatherImageUrl }) {
    return (
        currentWeatherImageUrl && (
            <div className="weatherImage">
                <img src={currentWeatherImageUrl} alt="Weather drawing" />
            </div>
        )
    );
}
