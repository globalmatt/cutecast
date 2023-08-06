import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { current, forecast } from "../testUtilities/testData";
import extractForecastWeatherData from "../utilities/extractForecastWeatherData";
import extractCurrentWeatherData from "../utilities/extractCurrentWeatherData";
import ForecastWeatherData from "../interfaces/ForecastWeatherData";
import { Context } from "../Context";
import ForecastWeather from "./ForecastWeather";

function getHour(timeUTC: number) {
    return new Date(timeUTC * 1000)
        .toLocaleString([], { hour: "numeric", hour12: true })
        .replace(/\s/g, "");
}

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

/*

TODO:

This test triggers React's "Invalid hook call" error due to a Jest issue
triggered by the dynamic import of `ForecastWeather`.

Using jest.isolateModules() is a suggested workaround:

- https://stackoverflow.com/questions/62360926/invalid-hook-call-when-mocking-react-hoc-with-jest

- https://github.com/jestjs/jest/issues/8987

...but it doesn't work in this case (and not using resetModules() still
triggers the error, so isolateModules() might not be a suitable
workaround anyway).

The next step would be to try upgrading Jest and/or React, and/or trying
workarounds that modify the Jest config, such as:

https://github.com/jestjs/jest/issues/8987#issuecomment-584898030

(Although again that specific workaround is more about issues with
resetModules().)

But to do that we'll first need to eject from CRA or switch to
Vite/NextJS etc. Not worth it at this stage, just to test 1 line of
code!

My hunch is that this is a mismatch between the versions of React and
Jest (specifically react-dom / jest-dom) that we're currently using.
Upgrading would be a sensible next step.

Also see:

https://legacy.reactjs.org/warnings/invalid-hook-call-warning.html



test.only("Throws error if the modal condition icon couldn't be found", async () => {
    const oldConsoleError = console.error;
    console.error = jest.fn();

    jest.useFakeTimers();
    jest.setSystemTime(new Date("2023-07-18T12:00:00Z"));

    jest.doMock("../utilities/getForecastsForDay", () => {
        return jest.fn(() => []);
    });

    const getForecastsForDay = require("../utilities/getForecastsForDay");

    console.log("getForecastsForDay", getForecastsForDay);

    jest.isolateModules(() => {
        const ForecastWeather = require("./ForecastWeather").default;

        console.log("ForecastWeather", ForecastWeather);

        expect(() =>
            render(
                <Context.Provider
                    value={{
                        currentWeatherData: extractCurrentWeatherData(
                            current.json()
                        ),
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
            )
        ).toThrow(new Error("No modal condition icon found"));
    });

    jest.useRealTimers();
    console.error = oldConsoleError;
});

*/
