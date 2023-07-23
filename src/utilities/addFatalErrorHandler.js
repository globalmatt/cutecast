/**
 * Add an error handler that captures any fatal errors from the app and
 * displays a friendly error screen.
 *
 * Listens to the `error` and `unhandledrejection` events on the
 * `window` object.
 */
export default function addFatalErrorHandler() {
    let errorListener = null;
    let unhandledrejectionListener = null;

    errorListener = window.addEventListener("error", (event) => {
        console.error("App: Error", event.message);
        window.removeEventListener("error", errorListener);
        showErrorPage();
    });

    unhandledrejectionListener = window.addEventListener(
        "unhandledrejection",
        (event) => {
            console.error("App: Unhandled Rejection", event.reason.message);
            window.removeEventListener(
                "unhandledrejection",
                unhandledrejectionListener
            );
            showErrorPage();
        }
    );
}

function showErrorPage() {
    document.getElementById("root").innerHTML = `
        <div class="errorPage">
            <div class="errorPage__content">
                <h1>Arrgh!</h1>
                <img src="images/weatherGremlin.png" alt="Weather Gremlin" width="100" height="100" />
                <p>The weather gremlins have struck! I can't show you the weather right now. :(</p>
                <button onClick="window.location.reload()">Try Again</button>
            </div>
        </div>
    `;
}
