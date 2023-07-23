import preloadWeatherImages from "./preloadWeatherImages";
import mockImageLoadEvent from "../testUtilities/mockImageLoadEvent";

mockImageLoadEvent();

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
