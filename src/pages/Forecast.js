import React, {useContext} from 'react';
import ReactPullToRefresh from 'react-pull-to-refresh';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CurrentWeatherImage from '../components/CurrentWeatherImage';
import {Context} from '../Context';
import {isDaytime, getMidnightTodayUTC, getIconImage} from '../utilities/weatherFunctions';


export default function Forecast() {

  const {currentWeatherData, currentWeatherImageUrl, forecastWeatherData, fetchForecastWeather, fetchWeather} = useContext(Context);

  function handleRefresh(resolve, reject) {
    console.log('refresh');
    fetchWeather();
    resolve();
    //reject(new Error('Promise failed'));
  }

  const currentTimeUTC = Math.round(new Date().getTime() / 1000);
  const next24HoursForecasts = forecastWeatherData.forecasts.filter( f => f.forecastTimeUTC < currentTimeUTC + 86400);

  function getHour(timeUTC) {
    return new Date(timeUTC*1000).toLocaleString([], { hour: 'numeric', hour12: true}).replace(/\s/g, '');
  }

  function getForecastsForDay(date) {
    const dateUTC = date.getTime() / 1000;

    // Return all forecasts for this day
    return forecastWeatherData.forecasts.filter(
      f => f.forecastTimeUTC >= dateUTC && f.forecastTimeUTC < dateUTC + 86400
    );
  }

  function getModalConditionIconForDay(date) {
    const forecastsForDay = getForecastsForDay(date);
    let midnightTodayUTC = getMidnightTodayUTC();
    const daysAfterToday = Math.round( ( (date.getTime() / 1000) - (midnightTodayUTC.getTime() / 1000) ) / 86400);

    // Calculate the frequencies of each condition icon
    // and store in an object ( {'01d': 3, '04d': 5, ...} )
    const conditionFrequencies = forecastsForDay.reduce(function (allConditions, f) { 
      
      // (Skip night-time conditions since we generally assume
      // the daily forecast is for the daytime)
      if ( isDaytime(
          f.forecastTimeUTC,
          currentWeatherData.sunriseUTC + 86400 * daysAfterToday,
          currentWeatherData.sunsetUTC + 86400 * daysAfterToday,
          currentWeatherData.sunriseUTC + 86400 * (daysAfterToday + 1),
          currentWeatherData.sunsetUTC + 86400 * (daysAfterToday + 1)) ) {

        if (f.conditionIcon in allConditions) {
          allConditions[f.conditionIcon]++
        }
        else {
          allConditions[f.conditionIcon] = 1
        }
      }

      return allConditions;
    }, {});

    // Find the modal condition icon
    let modalConditionIcon = null;
    let modalConditionFreq = 0;

    Object.keys(conditionFrequencies).forEach( ci => {
      if ( conditionFrequencies[ci] > modalConditionFreq ) {
        modalConditionIcon = ci;
        modalConditionFreq = conditionFrequencies[ci];
      }
    });
    return(modalConditionIcon);
  }

  function getMaxTempForDay(date) {
    const forecastsForDay = getForecastsForDay(date);

    // Calculate the max temp
    return forecastsForDay.map( f => f.tempC )
                                    .reduce( (max, cur) => Math.max( max, cur ),
                                    -Infinity
                                    );
  }

  function getMinTempForDay(date) {
    const forecastsForDay = getForecastsForDay(date);

    // Calculate the max temp
    return forecastsForDay.map( f => f.tempC )
                                    .reduce( (min, cur) => Math.min( min, cur ),
                                    Infinity
                                    );
  }

  function getDailyForecasts() {
    let date = getMidnightTodayUTC();
    const dailyForecasts = [];
    for (let i=1; i<=4; i++) {
      date.setDate(date.getDate() + 1);
      dailyForecasts.push( {
        weekday: new Intl.DateTimeFormat('en-US', { weekday: 'long'}).format(date),
        conditionIcon: getModalConditionIconForDay(date),
        maxTempC: getMaxTempForDay(date),
        minTempC: getMinTempForDay(date),
      } );
    }

    return dailyForecasts;
  }

  return(
    <ReactPullToRefresh
      onRefresh={handleRefresh}
      style={{
        textAlign: 'center'
    }}>
      <div id="content">
        <Header currentWeatherData={currentWeatherData} />
        <CurrentWeatherImage currentWeatherImageUrl={currentWeatherImageUrl} />
        <div className="forecast">
            <ul className="threehour">
                <li key="now">
                  <span className="time">Now</span>
                  <span className="icon">{getIconImage(currentWeatherData.conditionIcon)}</span>
                  <span className="temp">{Math.round(currentWeatherData.tempC)}&deg;</span>
                </li>
            {
              next24HoursForecasts.map( (f, i) =>
                <li key={i}>
                  <span className="time">{getHour(f.forecastTimeUTC)}</span>
                  <span className="icon">{getIconImage(f.conditionIcon)}</span>
                  <span className="temp">{Math.round(f.tempC)}&deg;</span>
                </li>
              )
            }
            </ul>

            <ul className="daily">
              {getDailyForecasts().map( (f, i) => <li key={i}>{f.conditionIcon}</li>)}
            </ul>
        </div>
        <Footer />
      </div>
    </ReactPullToRefresh>
  );

}

// [x] Convert times into human-readable format
// [ ] Display all 40 forecasts as a plain list for now
// [ ] Display icons instead of condition IDs
// [ ] Reformat screen so it's more like iOS Weather app (probably keep current weather header and bg image but fade image)
