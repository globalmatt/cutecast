import preloadWeatherImages from "./preloadWeatherImages";

/*

By default, jsdom (which Jest uses) emulates a browser that doesn't load
images. This means that image load events are never fired.

This test uses a fairly hacky workaround that overrides the `Image`
prototype to mock a `load` event.

The (probably) better long-term solution is to configure jsdom to
support image loading. This involves adding `"testEnvironmentOptions": {
"resources": "usable" }` to the Jest config. However, we are currently
using CRA, and `testEnvironmentOptions` is not one of the Jest options
that CRA allows us to configure. :(

TODO: Eject CRA (or just wipe it and set up webpack, babel etc
manually), or possibly install `react-app-rewired` which should let us
set `testEnvironmentOptions`. Then we can remove the hacky workaround
below.

@see https://stackoverflow.com/questions/57092154/how-to-test-img-onload-using-jest
@see https://stackoverflow.com/questions/44462665/how-do-you-use-jest-to-test-img-onerror/49204336#49204336
@see https://github.com/jsdom/jsdom/issues/1816
@see https://github.com/timarney/react-app-rewired/

*/

let originalImageSrcProto;

beforeAll(() => {
    // Keep a copy of the original Image.prototype.src
    // in order to restore it after these tests are done.
    originalImageSrcProto = Object.getOwnPropertyDescriptor(
        global.Image.prototype,
        "src"
    );

    // Mock the `Image.prototype.src` setter to fire the `load` event.
    Object.defineProperty(global.Image.prototype, "src", {
        // Define the property setter
        set(src) {
            setTimeout(() => {
                const event = new Event("load");
                this.dispatchEvent(event);
            }, 1);
        },
    });
});

afterAll(() => {
    // Restore the original `Image.prototype.src` property.
    Object.defineProperty(global.Image.prototype, "src", originalImageSrcProto);
});

test("Preloads the weather images correctly", (done) => {
    function imageLoadHandler(event) {
        try {
            expect(event.target).toBeInstanceOf(HTMLImageElement);
            done();
        } catch (error) {
            done(error);
        }
    }

    preloadWeatherImages(imageLoadHandler);
});
