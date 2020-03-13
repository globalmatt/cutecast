import React, {useContext} from 'react';
import './App.css';
import {Context} from './Context';

function App() {

  const {currentWeatherData, currentWeatherImageUrl} = useContext(Context);

  return (
    <div className="App">
      <div className="content">
        <h1>{currentWeatherData.cityName}</h1>
        <h2>{currentWeatherData.conditionName}, {Math.round(currentWeatherData.tempC)}&deg;</h2>
      </div>
      {
        currentWeatherImageUrl &&
        <div className="weatherImage">
          <img src={currentWeatherImageUrl} alt="Weather drawing" />
        </div>
      }
    </div>
  );
}

export default App;
