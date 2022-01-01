import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

import Current from "./Current";
import { ContextProvider } from "../Context";

test("Renders the correct page layout", () => {
    render(
        <ContextProvider>
            <BrowserRouter>
                <Current />
            </BrowserRouter>
        </ContextProvider>
    );
    expect(screen.getByText("Current")).toBeInTheDocument();
    expect(screen.getByText("Forecast")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
});
