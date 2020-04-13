import React from 'react';
import conditionCodes from '../conditionCodes.json';
import weatherImages from '../weatherImages.json';
import {imagesUrl, iconsUrl} from '../config.json';

// Return an array of all the image objects
export function getAllImages() {
  return weatherImages;
}

// Extract useful info from current weather raw data
export function extractCurrentWeatherData(rawData) {

  return ({
    cityName: rawData.name,
    cityId: rawData.id,
    conditionGroup: rawData.weather[0].main,
    conditionCode: rawData.weather[0].id,
    conditionIcon: rawData.weather[0].icon,
    conditionName: getConditionName(800, Math.round(new Date().getTime() / 1000), rawData.sys.sunrise, rawData.sys.sunset),
    tempC: rawData.main.temp,
    sunriseUTC: rawData.sys.sunrise,
    sunsetUTC: rawData.sys.sunset
  });
}

// Extract useful info from forecast weather raw data
export function extractForecastWeatherData(rawData) {

  const todaySunriseUTC = rawData.city.sunrise;
  const todaySunsetUTC = rawData.city.sunset;
  const tomorrowSunriseUTC = rawData.city.sunrise + 86400; // good-enough approximation
  const tomorrowSunsetUTC = rawData.city.sunset + 86400; // good-enough approximation

  return ({
    cityName: rawData.city.name,
    cityId: rawData.city.id,
    forecasts: rawData.list.map( f => ({
        forecastTimeUTC: f.dt,
        conditionGroup: f.weather[0].main,
        conditionCode: f.weather[0].id,
        conditionIcon:f.weather[0].icon,
        conditionName: getConditionName(f.weather[0].id, f.dt, todaySunriseUTC, todaySunsetUTC, tomorrowSunriseUTC, tomorrowSunsetUTC),
        tempC: f.main.temp
      })
    )
  });
}


// Preload the weather images in the browser. Also returns the weather image data.
export function preloadWeatherImages(imageLoadHandler) {
  console.log('preloadWeatherImages');
  weatherImages.forEach( img => {
    const i = new Image();
    i.src = imagesUrl + '/' + img.url;
    i.addEventListener('load', imageLoadHandler);
  });
  return weatherImages;
}

// Get a random suitable image to represent the current weather
export function getWeatherImageUrl(currentWeatherData) {
  const suitableImages = weatherImages.filter( i => 
    i.conditionCodes.includes(currentWeatherData.conditionCode) &&
    i.daytime === isDaytime( Math.round(new Date().getTime() / 1000), currentWeatherData.sunriseUTC, currentWeatherData.sunsetUTC)
  );
  console.log(suitableImages);

  if ( suitableImages.length > 0 ) {
    return imagesUrl + '/' + (suitableImages[Math.floor(Math.random() * suitableImages.length)]).url;
  } else {
    return null;
  }
}

function kelvinsToCelsius(t) {
  return t - 272.15;
  //return t - 272;
}

/*
function kelvinsToFahrenheit(t) {
  return t * 9 / 5 - 459.67;
}

function utcToCurrentTime(timeUTC, timezone) {
  return timeUTC + timezone;
}
*/

// Get condition name from code
function getConditionName(conditionCode, timeUTC, todaySunriseUTC, todaySunsetUTC, tomorrowSunriseUTC=null, tomorrowSunsetUTC=null) {
  let conditionName = conditionCodes[conditionCode];

  if ( !conditionName ) conditionName = "Unknown";

  if ( typeof conditionName !== 'string' ) {
    // Day/night object; get appropriate string based on time of day
    conditionName = isDaytime(timeUTC, todaySunriseUTC, todaySunsetUTC, tomorrowSunriseUTC, tomorrowSunsetUTC) ? conditionName.day : conditionName.night;
  }

  return conditionName;
}

export function isDaytime(timeUTC, todaySunriseUTC, todaySunsetUTC, tomorrowSunriseUTC=null, tomorrowSunsetUTC=null) {

  if (!tomorrowSunriseUTC || !tomorrowSunsetUTC) {
    return (timeUTC > todaySunriseUTC && timeUTC <= todaySunsetUTC);
  } else {
    return ( (timeUTC > todaySunriseUTC && timeUTC <= todaySunsetUTC) || (timeUTC > tomorrowSunriseUTC && timeUTC <= tomorrowSunsetUTC) );
  }
}

export function getMidnightTodayUTC() {
  let midnightTodayUTC = new Date();
  midnightTodayUTC.setHours(0,0,0,0);
  return midnightTodayUTC;
}

export function getIconImage(icon) {
  return <img src={`${iconsUrl}/${icon}@2x.png`} alt={icon} className="icon" />
}