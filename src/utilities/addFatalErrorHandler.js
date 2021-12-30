export default () => {
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
};

function showErrorPage() {
    document.getElementById("root").innerHTML = `
        <div class="errorPage">
            <div class="errorPage__content">
                <h1>Arrgh!</h1>
                <p>The weather gremlins have struck! I can't show you the weather right now. :(</p>
                <button onClick="window.location.reload()">Try Again</button>
            </div>
        </div>
    `;
}
