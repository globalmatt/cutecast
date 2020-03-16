import React, {useContext, useState, useLayoutEffect, useEffect} from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPullToRefresh from 'react-pull-to-refresh';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';
import './PullToRefresh.css';
import {Context} from './Context';

function App() {

  const {currentWeatherData, currentWeatherImageUrl, fetchCurrentWeather} = useContext(Context);
  const [weatherImageHeight, setWeatherImageHeight] = useState(0);

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

  // Set the weather image height using JS, because if it's set in CSS then it
  // gets overridden by the pull-to-refresh code
  useLayoutEffect(() => {
    function updateImageHeight() {
      setWeatherImageHeight(window.innerHeight);
    }
    window.addEventListener('resize', updateImageHeight);
    updateImageHeight();
    return () => window.removeEventListener('resize', updateImageHeight);
  }, []);

  // Refresh the weather data 
  function handleRefresh(resolve, reject) {
    console.log('refresh');
    fetchCurrentWeather();
    resolve();
    //reject(new Error('Promise failed'));
  }

  return (
<>
<ErrorBoundary>
    <div className="App">
    <ReactPullToRefresh
      onRefresh={handleRefresh}
      style={{
        textAlign: 'center'
      }}>

      <div id="content">

      <div className="content">
        <h1>{currentWeatherData.cityName}</h1>
        <h2>{currentWeatherData.conditionName}, {Math.round(currentWeatherData.tempC)}&deg;</h2>
      </div>
      {
        currentWeatherImageUrl &&
        <div className="weatherImage">
          <img src={currentWeatherImageUrl} alt="Weather drawing" style={{height: weatherImageHeight}} />
        </div>
      }

      </div>

      </ReactPullToRefresh>  
    </div>
    </ErrorBoundary>
</>
  );
}

export default App;
