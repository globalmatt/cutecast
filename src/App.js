import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";
import "./PullToRefresh.css";
import { progressBarWidth, loadingMessage } from "./config.json";
import Current from "./pages/Current";
import Forecast from "./pages/Forecast";
import Overlay from "./components/Overlay";
import ProgressBar from "./components/ProgressBar";
import { Context } from "./Context";

function App() {
    const { totalWeatherImages, totalImagesLoaded, areAllImagesLoaded } =
        useContext(Context);

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
