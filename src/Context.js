import React, {createContext, useEffect, useState, useCallback} from 'react';
import useMount from './hooks/useMount';
//import {toast} from 'react-toastify';
import {weatherApiUrl, weatherApiKey, weatherApiCurrentUrl, weatherApiForecastUrl, weatherFetchInterval, genericErrorMessage} from './config.json';
import {extractCurrentWeatherData, extractForecastWeatherData, preloadWeatherImages, getWeatherImageUrl, getAllImages} from './utilities/weatherFunctions';
import useStateWithLocalStorage from './hooks/useStateWithLocalStorage';


// https://openweathermap.org/weather-conditions

const Context = createContext();

function ContextProvider({children}) {

  const [currentWeatherDataRaw, setCurrentWeatherDataRaw] = useState({});
  const [currentWeatherData, setCurrentWeatherData] = useState({});
  const [forecastWeatherDataRaw, setForecastWeatherDataRaw] = useState({});
  const [forecastWeatherData, setForecastWeatherData] = useState({forecasts: []});
  const [lastWeatherFetchTime, setLastWeatherFetchTime] = useState(0);
  const [currentWeatherImageUrl, setCurrentWeatherImageUrl] = useState("");
  const [totalWeatherImages, setTotalWeatherImages] = useState(0);
  const [totalImagesLoaded, setTotalImagesLoaded] = useState(0);
  const [areAllImagesLoaded, setAreAllImagesLoaded] = useState(false);

  // App boot
  useMount( () => {
    console.log("App boot");
    const weatherImages = preloadWeatherImages(handleImageLoad);
    setTotalWeatherImages(weatherImages.length);
    console.log(weatherImages.length);
    fetchWeather();
  });

  // Fetch the current weather
  function fetchWeather() {

    // Throttle the weather data fetching
    const currentTime = new Date().getTime();
    if (currentTime - lastWeatherFetchTime < weatherFetchInterval * 1000) {
      console.log('not fetching weather - throttled');
      return;
    }

    // Get current weather by city
    console.log('fetching current weather');
    const currentWeatherRequestUrl = `${weatherApiUrl}${weatherApiCurrentUrl}Robertson,NSW,AU&units=metric&appid=${weatherApiKey}`;
    fetch(currentWeatherRequestUrl)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setCurrentWeatherDataRaw(res);
        setLastWeatherFetchTime(new Date().getTime());
      })
      .catch(err => console.log(err));

    // Get forecast weather by city
    console.log('fetching forecast weather');
    const forecastWeatherRequestUrl = `${weatherApiUrl}${weatherApiForecastUrl}Robertson,NSW,AU&units=metric&appid=${weatherApiKey}`;
    fetch(forecastWeatherRequestUrl)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setForecastWeatherDataRaw(res);
        setLastWeatherFetchTime(new Date().getTime());
      })
      .catch(err => console.log(err));
  }

  // Extract the current raw data and use it to set the current weather data
  useEffect( () => {
    if ( Object.entries(currentWeatherDataRaw).length > 0 ) {
      setCurrentWeatherData(extractCurrentWeatherData(currentWeatherDataRaw));
    }
  }, [currentWeatherDataRaw]);
  
  // Extract the forecast raw data and use it to set the forecast weather data
  useEffect( () => {
    if ( Object.entries(forecastWeatherDataRaw).length > 0 ) {
      setForecastWeatherData(extractForecastWeatherData(forecastWeatherDataRaw));
    }
  }, [forecastWeatherDataRaw]);

  // Pick an image for the current weather
  useEffect( () => {
    if ( Object.entries(currentWeatherData).length > 0 ) {
      console.log('setCurrentWeatherImageUrl');
      setCurrentWeatherImageUrl(getWeatherImageUrl(currentWeatherData));
    }
  }, [currentWeatherData]);

  // Set the areAllImagesLoaded state variable to true once all images have preloaded
  useEffect( () => {
    if ( totalImagesLoaded >= getAllImages().length && totalImagesLoaded > 0 ) {
        setAreAllImagesLoaded(true);
        console.log("All images preloaded");
    }
  }, [totalImagesLoaded]);

  // Record a successfully-loaded image
  function handleImageLoad() {
    setTotalImagesLoaded( prevTotalImagesLoaded => prevTotalImagesLoaded + 1 );
  }

  // Render the provider and children
  return(
    <Context.Provider value={{
      currentWeatherData,
      currentWeatherImageUrl,
      forecastWeatherData,      
      lastWeatherFetchTime,
      totalWeatherImages,
      totalImagesLoaded,
      areAllImagesLoaded,
      fetchWeather
    }}>
      {children}
    </Context.Provider>
  )
}

export {Context, ContextProvider};
