// Vendors
import React from "react";
import ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";

// Components
import App from "./App";
import { ContextProvider } from "./Context";

// Helper functions
import addFatalErrorHandler from "./utilities/addFatalErrorHandler";
import * as serviceWorker from "./serviceWorker";

// Stylesheets
import "./index.css";

addFatalErrorHandler();

ReactDOM.render(
    <div className="appContainer">
        <ContextProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ContextProvider>
        <ToastContainer limit={1} />
    </div>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
