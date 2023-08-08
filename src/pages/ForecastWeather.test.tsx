import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { current, forecast } from "../testUtilities/testData";
import extractForecastWeatherData from "../utilities/extractForecastWeatherData";
import extractCurrentWeatherData from "../utilities/extractCurrentWeatherData";
import ForecastWeatherData from "../interfaces/ForecastWeatherData";
import getHour from "../utilities/getHour";
import { Context } from "../Context";
import ForecastWeather from "./ForecastWeather";

test("Renders the forecast weather correctly", async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2023-07-18T12:00:00Z"));
    const currentTimeUTC = Math.round(new Date().getTime() / 1000);

    render(
        <Context.Provider
            value={{
                currentWeatherData: extractCurrentWeatherData(current.json()),
                currentWeatherImageUrl: "http://localhost/test.jpg",
                forecastWeatherData: extractForecastWeatherData(
                    forecast.json()
                ),
                lastWeatherFetchTime: 0,
                totalWeatherImages: 10,
                totalImagesLoaded: 1,
                areAllImagesLoaded: false,
                fetchWeather: async () => {},
            }}
        >
            <BrowserRouter>
                <ForecastWeather />
            </BrowserRouter>
        </Context.Provider>
    );

    // Assert that the header contains the correct title.
    expect(
        screen.getByRole("heading", { name: "Robertson Forecast" })
    ).toBeInTheDocument();

    // Assert that the hourly forecast items are correctly displayed.
    forecast.json().list.forEach((f) => {
        if (f.dt > currentTimeUTC && f.dt < currentTimeUTC + 86400) {
            expect(
                screen.getByRole("listitem", {
                    name: getHour(f.dt),
                })
            ).toBeInTheDocument();
        }
    });

    // Assert that the daily forecast items are correctly displayed.

    expect(
        screen.getByRole("row", { name: "Wednesday 01d 11° -1°" })
    ).toBeInTheDocument();

    expect(
        screen.getByRole("row", { name: "Thursday 04d 15° 0°" })
    ).toBeInTheDocument();

    expect(
        screen.getByRole("row", { name: "Friday 04d 11° 4°" })
    ).toBeInTheDocument();

    expect(
        screen.getByRole("row", { name: "Saturday 01d 12° 0°" })
    ).toBeInTheDocument();

    // Assert that the weather image is correctly displayed.
    const img = screen.getByRole("img", { name: "Weather drawing" });
    expect(img).toHaveAttribute("src", "http://localhost/test.jpg");

    // Assert that the footer is correctly displayed.
    expect(screen.getByRole("link", { name: "Current" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Forecast" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Settings" })).toBeInTheDocument();

    jest.useRealTimers();
});

test("Doesn't render anything if no forecast was supplied", async () => {
    render(
        <Context.Provider
            value={{
                currentWeatherData: extractCurrentWeatherData(current.json()),
                currentWeatherImageUrl: "http://localhost/test.jpg",
                forecastWeatherData: {} as ForecastWeatherData,
                lastWeatherFetchTime: 0,
                totalWeatherImages: 10,
                totalImagesLoaded: 1,
                areAllImagesLoaded: false,
                fetchWeather: async () => {},
            }}
        >
            <BrowserRouter>
                <ForecastWeather />
            </BrowserRouter>
        </Context.Provider>
    );

    // Assert that no heading was appended to the DOM.
    expect(screen.queryByRole("heading")).toBeFalsy();
});
