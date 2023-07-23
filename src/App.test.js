import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";

import App from "./App";
import { ContextProvider } from "./Context";

import mockImageLoadEvent from "./testUtilities/mockImageLoadEvent";

mockImageLoadEvent();

test.skip("App runs and displays current weather", async () => {
    render(
        <ContextProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ContextProvider>
    );

    // Check the app state on initial load.
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(screen.getByText("Loading Images")).toBeInTheDocument();
    expect(screen.getByText("Current")).toBeInTheDocument();
    expect(screen.getByText("Forecast")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();

    // Check that the current weather was fetched and a weather image
    // was displayed.
    await waitFor(
        () =>
            expect(screen.getByAltText("Weather drawing")).toBeInTheDocument(),
        {
            timeout: 5000,
        }
    );
});
