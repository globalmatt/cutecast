// Vendors
import React from "react";
import PropTypes from "prop-types";

interface CurrentWeatherImageProps {
    currentWeatherImageUrl: string;
}

/**
 * Current Weather Image component.
 *
 * Renders the supplied weather image.
 *
 * @returns {ReactElement} The `<CurrentWeatherImage />` component.
 */
export default function CurrentWeatherImage({
    currentWeatherImageUrl,
}: CurrentWeatherImageProps) {
    return (
        currentWeatherImageUrl && (
            <div className="weatherImage">
                <img src={currentWeatherImageUrl} alt="Weather drawing" />
            </div>
        )
    );
}

CurrentWeatherImage.propTypes = {
    /** The URL of the image to render. */
    currentWeatherImageUrl: PropTypes.string,
};
