import addFatalErrorHandler from "./addFatalErrorHandler";

test("Adds an error listener", async () => {
    window.addEventListener = jest.fn();
    addFatalErrorHandler();

    expect(window.addEventListener).toBeCalledWith(
        "error",
        expect.any(Function)
    );
});

test("Adds an unhandled rejection listener", async () => {
    window.addEventListener = jest.fn();
    addFatalErrorHandler();

    expect(window.addEventListener).toBeCalledWith(
        "unhandledrejection",
        expect.any(Function)
    );
});

test("Runs the error listener correctly", async () => {
    const oldConsoleError = console.error;
    console.error = jest.fn();

    let listener = jest.fn();

    let el = {
        innerHTML: "",
    } as HTMLElement;

    document.getElementById = jest.fn(() => el);

    // Mock just the first call to addEventListener.
    window.addEventListener = jest
        .fn()
        .mockImplementationOnce((_event, callback) => (listener = callback));

    window.removeEventListener = jest.fn();

    addFatalErrorHandler();
    listener({ reason: "error", message: "Test Error" });

    expect(console.error).toBeCalledWith("App: Error", "Test Error");
    expect(window.removeEventListener).toBeCalledWith(
        "error",
        expect.any(Function)
    );

    expect(document.getElementById).toBeCalledWith("root");

    expect(el.innerHTML).toMatchInlineSnapshot(`
"
            <div class=\\"errorPage\\">
                <div class=\\"errorPage__content\\">
                    <h1>Arrgh!</h1>
                    <img src=\\"images/weatherGremlin.png\\" alt=\\"Weather Gremlin\\" width=\\"100\\" height=\\"100\\" />
                    <p>The weather gremlins have struck! I can't show you the weather right now. :(</p>
                    <button onClick=\\"window.location.reload()\\">Try Again</button>
                </div>
            </div>
        "
`);

    console.error = oldConsoleError;
});

test("Runs the unhanded rejection listener correctly", async () => {
    const oldConsoleError = console.error;
    console.error = jest.fn();

    let listener = jest.fn();

    let el = {
        innerHTML: "",
    } as HTMLElement;

    document.getElementById = jest.fn(() => el);

    // Mock just the second call to addEventListener.
    window.addEventListener = jest
        .fn()
        .mockImplementationOnce(() => {})
        .mockImplementationOnce((_event, callback) => (listener = callback));

    window.removeEventListener = jest.fn();

    addFatalErrorHandler();
    listener({ reason: { message: "Test Rejection" } });

    expect(console.error).toBeCalledWith(
        "App: Unhandled Rejection",
        "Test Rejection"
    );
    expect(window.removeEventListener).toBeCalledWith(
        "unhandledrejection",
        expect.any(Function)
    );

    expect(document.getElementById).toBeCalledWith("root");

    expect(el.innerHTML).toMatchInlineSnapshot(`
"
            <div class=\\"errorPage\\">
                <div class=\\"errorPage__content\\">
                    <h1>Arrgh!</h1>
                    <img src=\\"images/weatherGremlin.png\\" alt=\\"Weather Gremlin\\" width=\\"100\\" height=\\"100\\" />
                    <p>The weather gremlins have struck! I can't show you the weather right now. :(</p>
                    <button onClick=\\"window.location.reload()\\">Try Again</button>
                </div>
            </div>
        "
`);

    console.error = oldConsoleError;
});
