import React, {createContext, useEffect, useState} from 'react';
//import {toast} from 'react-toastify';
import {weatherApiUrl, weatherApiKey, weatherFetchInterval, genericErrorMessage} from './config.json';
import {extractCurrentWeatherData, preloadWeatherImages, getWeatherImageUrl, getAllImages} from './utilities/weatherFunctions';
import useStateWithLocalStorage from './hooks/useStateWithLocalStorage';

// https://openweathermap.org/weather-conditions

const Context = createContext();

function ContextProvider({children}) {

  const [currentWeatherDataRaw, setCurrentWeatherDataRaw] = useStateWithLocalStorage('currentWeatherDataRaw', {});
  const [currentWeatherData, setCurrentWeatherData] = useStateWithLocalStorage('currentWeatherData', {});
  const [lastWeatherFetchTime, setLastWeatherFetchTime] = useStateWithLocalStorage('lastWeatherFetchTime', 0);
  const [currentWeatherImageUrl, setCurrentWeatherImageUrl] = useStateWithLocalStorage('currentWeatherImageUrl', "");
  const [totalImagesLoaded, setTotalImagesLoaded] = useState(0);
  const [areAllImagesLoaded, setAreAllImagesLoaded] = useState(false);

  // App boot
  useEffect(
    () => {

      preloadWeatherImages(handleImageLoad);

      // Throttle the weather data fetching
      const currentTime = new Date().getTime();
      if ( currentTime - lastWeatherFetchTime < weatherFetchInterval * 1000 ) return;
      console.log(currentTime);
      console.log(lastWeatherFetchTime);
      console.log(weatherFetchInterval);

      // Get current weather by city
      const requestUrl = `${weatherApiUrl}Robertson,NSW,AU&appid=${weatherApiKey}`;
      fetch(requestUrl)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setCurrentWeatherDataRaw(res);
        setLastWeatherFetchTime(new Date().getTime());
      })
      .catch(err => console.log(err));
    },
    [setCurrentWeatherDataRaw,
    setCurrentWeatherData,
    lastWeatherFetchTime,
    setLastWeatherFetchTime,
    setCurrentWeatherImageUrl]
  );

  // Extract the raw data and use it to set the current weather data
  useEffect( () => {
    if ( Object.entries(currentWeatherDataRaw).length > 0 ) {
      setCurrentWeatherData(extractCurrentWeatherData(currentWeatherDataRaw));
    }
  }, [currentWeatherDataRaw, setCurrentWeatherData]);
  
  // Pick an image for the current weather
  useEffect( () => {
    if ( Object.entries(currentWeatherData).length > 0 ) {
      setCurrentWeatherImageUrl(getWeatherImageUrl(currentWeatherData));
    }
  }, [currentWeatherData, setCurrentWeatherImageUrl]);

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

  return(
    <Context.Provider value={{
      currentWeatherData,
      lastWeatherFetchTime,
      currentWeatherImageUrl,
      areAllImagesLoaded
    }}>
      {children}
    </Context.Provider>
  )
}

export {Context, ContextProvider};
