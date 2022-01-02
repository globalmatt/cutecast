import React from "react";
import config from "../config.json";

/**
 * Return an icon image element for the supplied icon name.
 *
 * @param {String} icon - The icon name.
 * @returns {JSX.Element} The icon's `<img />` element.
 */
export default function getIconImage(icon) {
    return (
        <img
            src={`${config.iconsUrl}/${icon}@2x.png`}
            alt={icon}
            className="icon"
        />
    );
}
