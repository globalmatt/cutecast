import config from "../config.json";
import weatherImages from "../weatherImages.json";

/**
 * Preload the weather images in the browser.
 *
 * @param {Function} imageLoadHandler A function to call each time an
 * image is loaded.
 * @returns {Array} A list of all weather image objects.
 */
export default function preloadWeatherImages(imageLoadHandler) {
    weatherImages.forEach((img) => {
        const i = new Image();
        i.src = config.imagesUrl + "/" + img.url;
        i.addEventListener("load", imageLoadHandler);
    });
    return weatherImages;
}
