import React from "react";
import ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { ContextProvider } from "./Context";
import * as serviceWorker from "./serviceWorker";
import addFatalErrorHandler from "./utilities/addFatalErrorHandler";

addFatalErrorHandler();

ReactDOM.render(
    <div>
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
