import React, { useContext, useState, useLayoutEffect, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";
import "./PullToRefresh.css";
import { progressBarWidth, loadingMessage } from "./config.json";
import Header from "./components/Header";
import CurrentWeatherImage from "./components/CurrentWeatherImage";
import Footer from "./components/Footer";
import Current from "./pages/Current";
import Forecast from "./pages/Forecast";
import Overlay from "./components/Overlay";
import ProgressBar from "./components/ProgressBar";
import { Context } from "./Context";

function App() {
    const { totalWeatherImages, totalImagesLoaded, areAllImagesLoaded } =
        useContext(Context);

    // https://javascript.info/promise-error-handling
    // (doesn't seem to work - how can we catch the rejected Promise in handleRefresh()?)
    useEffect(() => {
        window.addEventListener("unhandledrejection", function (event) {
            // the event object has two special properties:
            console.log("caught rejection");
            toast("Oops, something went wrong! Please try again."); // [object Promise] - the promise that generated the error
            //alert(event.reason); // Error: Whoops! - the unhandled error object
        });
    }, []);

    return (
        <ErrorBoundary>
            <div className="App">
                <Overlay visible={!areAllImagesLoaded}>
                    <ProgressBar
                        current={totalImagesLoaded}
                        total={totalWeatherImages}
                        barWidth={progressBarWidth}
                    />
                    <div>{loadingMessage}</div>
                </Overlay>
                <Switch>
                    <Route exact path="/">
                        <Current />
                    </Route>
                    <Route exact path="/forecast">
                        <Forecast />
                    </Route>
                </Switch>
            </div>
        </ErrorBoundary>
    );
}

export default App;
