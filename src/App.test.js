import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { current, forecast } from "./testUtilities/testData";
import extractForecastWeatherData from "./utilities/extractForecastWeatherData";
import extractCurrentWeatherData from "./utilities/extractCurrentWeatherData";

import App from "./App";
import { Context } from "./Context";

import mockImageLoadEvent from "./testUtilities/mockImageLoadEvent";

mockImageLoadEvent();

test("App runs and displays progress bar initially", async () => {
    render(
        <Context.Provider
            value={{
                currentWeatherData: {},
                currentWeatherImageUrl: "",
                forecastWeatherData: {},
                totalWeatherImages: 10,
                totalImagesLoaded: 1,
                areAllImagesLoaded: false,
            }}
        >
            {" "}
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Context.Provider>
    );

    // Check the app state on initial load.
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(screen.getByText("Loading Images")).toBeInTheDocument();
    expect(screen.getByText("Current")).toBeInTheDocument();
    expect(screen.getByText("Forecast")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
});

test("App displays current weather once images and data have loaded", async () => {
    render(
        <Context.Provider
            value={{
                currentWeatherData: extractCurrentWeatherData(current.json()),
                currentWeatherImageUrl: "http://localhost/test.jpg",
                forecastWeatherData: extractForecastWeatherData(
                    forecast.json()
                ),

                totalWeatherImages: 10,
                totalImagesLoaded: 1,
                areAllImagesLoaded: false,
            }}
        >
            {" "}
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Context.Provider>
    );

    // Assert that the header contains the current conditions.
    expect(
        screen.getByRole("heading", { name: "Robertson" })
    ).toBeInTheDocument();
    expect(
        screen.getByRole("heading", { name: "Clear, 10°" })
    ).toBeInTheDocument();

    // Assert that the weather image is correctly displayed.
    const img = screen.getByRole("img", { name: "Weather drawing" });
    expect(img).toHaveAttribute("src", "http://localhost/test.jpg");

    // Assert that the footer is correctly displayed.
    expect(screen.getByRole("link", { name: "Current" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Forecast" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Settings" })).toBeInTheDocument();
});
