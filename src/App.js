import React, {useContext, useState, useLayoutEffect, useEffect} from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPullToRefresh from 'react-pull-to-refresh';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';
import './PullToRefresh.css';
import Header from './components/Header';
import CurrentWeatherImage from './components/CurrentWeatherImage';
import {Context} from './Context';

function App() {

  const {currentWeatherData, currentWeatherImageUrl, fetchCurrentWeather} = useContext(Context);

  // https://javascript.info/promise-error-handling
  // (doesn't seem to work - how can we catch the rejected Promise in handleRefresh()?)
  useEffect( () => {
    window.addEventListener('unhandledrejection', function(event) {
      // the event object has two special properties:
      console.log('caught rejection');
      toast("Oops, something went wrong! Please try again."); // [object Promise] - the promise that generated the error
      //alert(event.reason); // Error: Whoops! - the unhandled error object
    });
  }, []);


  // Refresh the weather data 
  function handleRefresh(resolve, reject) {
    console.log('refresh');
    fetchCurrentWeather();
    resolve();
    //reject(new Error('Promise failed'));
  }

  return (
    <ErrorBoundary>
        <div className="App">
        <ReactPullToRefresh
          onRefresh={handleRefresh}
          style={{
            textAlign: 'center'
          }}>
          <div id="content">
            <Header currentWeatherData={currentWeatherData} />
            <CurrentWeatherImage currentWeatherImageUrl={currentWeatherImageUrl} />
          </div>
          </ReactPullToRefresh>  
        </div>
        </ErrorBoundary>
  );
}

export default App;
