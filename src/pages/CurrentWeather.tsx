// Vendors
import React, { useContext } from "react";
import PullToRefresh from "react-simple-pull-to-refresh";

//Components
import Header from "../components/Header";
import Footer from "../components/Footer";
import CurrentWeatherImage from "../components/CurrentWeatherImage";
import { Context } from "../Context";

/**
 * The Current Weather page.
 *
 * Renders the Current Weather page, comprising the header, current
 * weather image, and footer.
 *
 * @returns {ReactElement} The `<CurrentWeather />` component.
 */
export default function CurrentWeather() {
    const { currentWeatherData, currentWeatherImageUrl, fetchWeather } =
        useContext(Context);

    return (
        <PullToRefresh onRefresh={fetchWeather} className="refresh-view">
            <div id="content">
                <Header currentWeatherData={currentWeatherData} />
                <CurrentWeatherImage
                    currentWeatherImageUrl={currentWeatherImageUrl}
                />
                <Footer />
            </div>
        </PullToRefresh>
    );
}
