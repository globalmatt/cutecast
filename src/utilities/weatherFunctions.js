
import conditionCodes from '../conditionCodes.json';
import weatherImages from '../weatherImages.json';
import {imagesUrl} from '../config.json';

// Return an array of all the image objects
export function getAllImages() {
  return weatherImages;
}

// Extract useful info from current weather raw data
export function extractCurrentWeatherData(rawData) {
  let conditionName = conditionCodes[rawData.weather[0].id];

  if ( typeof conditionName !== 'string' ) {
    // Day/night object; get appropriate string based on time of day
    conditionName = isDaytime(rawData.sys.sunrise, rawData.sys.sunset) ? conditionName.day : conditionName.night;
  }

  return ({
    cityName: rawData.name,
    cityId: rawData.id,
    conditionGroup: rawData.weather[0].main,
    conditionCode: rawData.weather[0].id,
    conditionName,
    tempC: kelvinsToCelsius(rawData.main.temp),
    sunriseUTC: rawData.sys.sunrise,
    sunsetUTC: rawData.sys.sunset
  });
}

// Preload the weather images in the browser
export function preloadWeatherImages(imageLoadHandler) {
  console.log('preloadWeatherImages');
  weatherImages.forEach( img => {
    const i = new Image();
    i.src = imagesUrl + '/' + img.url;
    i.addEventListener('load', imageLoadHandler);
  });
}

// Get a random suitable image to represent the current weather
export function getWeatherImageUrl(currentWeatherData) {
  const suitableImages = weatherImages.filter( i => 
    i.conditionCodes.includes(currentWeatherData.conditionCode) &&
    i.daytime === isDaytime(currentWeatherData.sunriseUTC, currentWeatherData.sunsetUTC)
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
}

/*
function kelvinsToFahrenheit(t) {
  return t * 9 / 5 - 459.67;
}

function utcToCurrentTime(timeUTC, timezone) {
  return timeUTC + timezone;
}
*/

function isDaytime(sunriseUTC, sunsetUTC) {
  const currentTimeUTCSeconds = Math.round(new Date().getTime() / 1000);
  return ( currentTimeUTCSeconds > sunriseUTC && currentTimeUTCSeconds <= sunsetUTC );
}