import React, {useState, useLayoutEffect} from 'react';

export default function CurrentWeatherImage({currentWeatherImageUrl}) {

  const [weatherImageHeight, setWeatherImageHeight] = useState(0);  

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

  return (
    currentWeatherImageUrl &&
    <div className="weatherImage">
      <img src={currentWeatherImageUrl} alt="Weather drawing" style={{height: weatherImageHeight}} />
    </div>
  );
}