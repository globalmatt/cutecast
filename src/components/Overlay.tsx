// Vendors
import React, { PropsWithChildren } from "react";
import PropTypes from "prop-types";

type OverlayProps = PropsWithChildren<{
    visible: boolean;
}>;


/**
 * A coloured overlay that covers the page while the images are loading.
 *
 * @returns {ReactElement} The `<Overlay />` component.
 */
function Overlay({ visible, children }: OverlayProps) {
    return (
        <div className={visible ? "overlay" : "overlay hidden"}>
            <div className="content">{children}</div>
        </div>
    );
}

Overlay.propTypes = {
    /** Whether the overlay is visible. */
    visible: PropTypes.bool,
    /** The content to render inside the overlay wrapper (everything
     * that should be hidden by the overlay). */
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default Overlay;
