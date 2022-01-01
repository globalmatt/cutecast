// Vendors
import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

// Hooks
import useMount from "./hooks/useMount";

// Config
import config from "./config.json";

// Helper functions
import {
    extractCurrentWeatherData,
    extractForecastWeatherData,
    preloadWeatherImages,
    getWeatherImageUrl,
    getAllImages,
} from "./utilities/weatherFunctions";

const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;

const Context = createContext();

/**
 * Renders the supplied content (app) wrapped inside a
 * `<Context.Provider />` component. The provider includes all the state
 * variables and functions needed for the app's context.
 *
 * @param {*} children - The content to render inside the
 * `<Context.Provider />` component.
 *
 * @returns {ReactElement} The content wrapped inside the
 * `<Context.Provider />` component.
 */
function ContextProvider({ children }) {
    const [currentWeatherDataRaw, setCurrentWeatherDataRaw] = useState({});
    const [currentWeatherData, setCurrentWeatherData] = useState({});
    const [forecastWeatherDataRaw, setForecastWeatherDataRaw] = useState({});
    const [forecastWeatherData, setForecastWeatherData] = useState({
        forecasts: [],
    });
    const [lastWeatherFetchTime, setLastWeatherFetchTime] = useState(0);
    const [currentWeatherImageUrl, setCurrentWeatherImageUrl] = useState("");
    const [totalWeatherImages, setTotalWeatherImages] = useState(0);
    const [totalImagesLoaded, setTotalImagesLoaded] = useState(0);
    const [areAllImagesLoaded, setAreAllImagesLoaded] = useState(false);

    // App boot
    useMount(() => {
        const weatherImages = preloadWeatherImages(handleImageLoad);
        setTotalWeatherImages(weatherImages.length);
        fetchWeather();
    });

    // Fetch the current weather
    async function fetchWeather() {
        // Throttle the weather data fetching
        const currentTime = new Date().getTime();
        if (
            currentTime - lastWeatherFetchTime <
            config.weatherFetchInterval * 1000
        ) {
            console.warn("not fetching weather - throttled");
            return;
        }

        // Get current weather by city
        const currentWeatherRequestUrl = `${config.weatherApiUrl}${config.weatherApiCurrentUrl}Robertson,NSW,AU&units=metric&appid=${weatherApiKey}`;
        const currentWeather = await fetch(currentWeatherRequestUrl);

        if (!currentWeather.ok) {
            throw Error(currentWeather.status);
        }

        setCurrentWeatherDataRaw(await currentWeather.json());
        setLastWeatherFetchTime(new Date().getTime());

        // Get forecast weather by city
        const forecastWeatherRequestUrl = `${config.weatherApiUrl}${config.weatherApiForecastUrl}Robertson,NSW,AU&units=metric&appid=${weatherApiKey}`;
        const forecastWeather = await fetch(forecastWeatherRequestUrl);

        if (!forecastWeather.ok) {
            throw Error(forecastWeather.status);
        }

        setForecastWeatherDataRaw(await forecastWeather.json());
        setLastWeatherFetchTime(new Date().getTime());
    }

    // Extract the current raw data and use it to set the current weather data
    useEffect(() => {
        if (Object.entries(currentWeatherDataRaw).length > 0) {
            setCurrentWeatherData(
                extractCurrentWeatherData(currentWeatherDataRaw)
            );
        }
    }, [currentWeatherDataRaw]);

    // Extract the forecast raw data and use it to set the forecast weather data
    useEffect(() => {
        if (Object.entries(forecastWeatherDataRaw).length > 0) {
            setForecastWeatherData(
                extractForecastWeatherData(forecastWeatherDataRaw)
            );
        }
    }, [forecastWeatherDataRaw]);

    // Pick an image for the current weather
    useEffect(() => {
        if (Object.entries(currentWeatherData).length > 0) {
            console.log("setCurrentWeatherImageUrl");
            setCurrentWeatherImageUrl(getWeatherImageUrl(currentWeatherData));
        }
    }, [currentWeatherData]);

    // Set the areAllImagesLoaded state variable to true once all images have preloaded
    useEffect(() => {
        if (
            totalImagesLoaded >= getAllImages().length &&
            totalImagesLoaded > 0
        ) {
            setAreAllImagesLoaded(true);
        }
    }, [totalImagesLoaded]);

    // Record a successfully-loaded image
    function handleImageLoad() {
        setTotalImagesLoaded(
            (prevTotalImagesLoaded) => prevTotalImagesLoaded + 1
        );
    }

    // Render the provider and children
    return (
        <Context.Provider
            value={{
                currentWeatherData,
                currentWeatherImageUrl,
                forecastWeatherData,
                lastWeatherFetchTime,
                totalWeatherImages,
                totalImagesLoaded,
                areAllImagesLoaded,
                fetchWeather,
            }}
        >
            {children}
        </Context.Provider>
    );
}

ContextProvider.propTypes = {
    /** The child elements to display inside the `<Context.Provider />`
     * component (typically this will be the entire app). */
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export { Context, ContextProvider };
