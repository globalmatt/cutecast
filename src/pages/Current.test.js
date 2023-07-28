import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { current } from "../testUtilities/testData";
import extractCurrentWeatherData from "../utilities/extractCurrentWeatherData";

import Current from "./Current";
import { Context } from "../Context";

test("Renders the current weather correctly", () => {
    render(
        <Context.Provider
            value={{
                currentWeatherData: extractCurrentWeatherData(current.json()),
                currentWeatherImageUrl: "http://localhost/test.jpg",
            }}
        >
            <BrowserRouter>
                <Current />
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
