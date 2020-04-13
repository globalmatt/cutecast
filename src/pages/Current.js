import React, {useContext} from 'react';
import ReactPullToRefresh from 'react-pull-to-refresh';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CurrentWeatherImage from '../components/CurrentWeatherImage';
import {Context} from '../Context';

export default function Current() {

  const {currentWeatherData, currentWeatherImageUrl, fetchWeather, totalImagesLoaded} = useContext(Context);

  // Refresh the weather data 
  function handleRefresh(resolve, reject) {
    console.log('refresh');
    fetchWeather();
    resolve();
    //reject(new Error('Promise failed'));
  }

  console.log("Current rendered");
  console.log('totalImagesLoaded:', totalImagesLoaded);


  return(
    <ReactPullToRefresh
      onRefresh={handleRefresh}
      style={{
        textAlign: 'center'
    }}>
      <div id="content">
        <Header currentWeatherData={currentWeatherData} />
        <CurrentWeatherImage currentWeatherImageUrl={currentWeatherImageUrl} />
        <Footer />
      </div>
    </ReactPullToRefresh>
  );

}