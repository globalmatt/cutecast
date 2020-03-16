import React from 'react';

export default function header({currentWeatherData}) {
  return(
    <div className="content">
      <h1>{currentWeatherData.cityName}</h1>
      <h2>{currentWeatherData.conditionName}, {Math.round(currentWeatherData.tempC)}&deg;</h2>
    </div>
  );
}