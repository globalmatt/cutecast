import React from 'react';

export default function Header({currentWeatherData}) {
  return(
    <div className="header">
      <h1>{currentWeatherData.cityName}</h1>
      <h2>{currentWeatherData.conditionName}, {Math.round(currentWeatherData.tempC)}&deg;</h2>
    </div>
  );
}