// Vendors
import React, {
    PropsWithChildren,
    createContext,
    useEffect,
    useState,
} from "react";
import PropTypes from "prop-types";

// Types
import RawCurrentWeatherData from "./interfaces/RawCurrentWeatherData";
import RawForecastWeatherData from "./interfaces/RawForecastWeatherData";
import CurrentWeatherData from "./interfaces/CurrentWeatherData";
import ForecastWeatherData from "./interfaces/ForecastWeatherData";

// Hooks
import useMount from "./hooks/useMount";

// Config
import weatherImages from "./weatherImages.json";

// Helper functions
import fetchWeatherData from "./utilities/fetchWeatherData";
import extractCurrentWeatherData from "./utilities/extractCurrentWeatherData";
import extractForecastWeatherData from "./utilities/extractForecastWeatherData";
import preloadWeatherImages from "./utilities/preloadWeatherImages";
import getWeatherImageUrl from "./utilities/getWeatherImageUrl";

interface ContextType {
    currentWeatherData: CurrentWeatherData;
    currentWeatherImageUrl: string;
    forecastWeatherData: ForecastWeatherData;
    lastWeatherFetchTime: number;
    totalWeatherImages: number;
    totalImagesLoaded: number;
    areAllImagesLoaded: boolean;
    fetchWeather(): Promise<void>;
}

const Context = createContext({} as ContextType);

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
function ContextProvider(props: PropsWithChildren) {
    const [currentWeatherDataRaw, setCurrentWeatherDataRaw] = useState(
        {} as RawCurrentWeatherData
    );
    const [currentWeatherData, setCurrentWeatherData] = useState(
        {} as CurrentWeatherData
    );
    const [forecastWeatherDataRaw, setForecastWeatherDataRaw] = useState(
        {} as RawForecastWeatherData
    );
    const [forecastWeatherData, setForecastWeatherData] = useState(
        {} as ForecastWeatherData
    );
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

    // Fetch the latest weather data
    async function fetchWeather() {
        const res = await fetchWeatherData(lastWeatherFetchTime);
        if (res) {
            setCurrentWeatherDataRaw(res[0]);
            setForecastWeatherDataRaw(res[1]);
            setLastWeatherFetchTime(new Date().getTime());
        } else {
            console.log("throttled");
        }
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
            setCurrentWeatherImageUrl(
                getWeatherImageUrl(currentWeatherData) || ""
            );
        }
    }, [currentWeatherData]);

    // Set the areAllImagesLoaded state variable to true once all images have preloaded
    useEffect(() => {
        if (
            totalImagesLoaded >= weatherImages.length &&
            totalImagesLoaded > 0
        ) {
            setAreAllImagesLoaded(true);
            console.log("setAreAllImagesLoaded");
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
            {props.children}
        </Context.Provider>
    );
}

ContextProvider.propTypes = {
    /** The child elements to display inside the `<Context.Provider />`
     * component (typically this will be the entire app). */
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export { Context, ContextProvider };
