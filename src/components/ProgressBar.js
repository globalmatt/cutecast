// Vendors
import React from "react";
import PropTypes from "prop-types";

/**
 * A progress bar.
 *
 * Renders a simple progress bar.
 *
 * @returns {ReactElement} The `<Overlay />` component.
 */
function ProgressBar({ current, total, barWidth }) {
    function progressBarWidth() {
        if (total === 0) {
            return 0;
        } else {
            return Math.ceil((current / total) * barWidth);
        }
    }

    return (
        <div className="progressBar">
            <div className="fill" style={{ width: progressBarWidth() }}></div>
        </div>
    );
}

ProgressBar.propTypes = {
    /** The current progress value (between zero and `total`). */
    current: PropTypes.number,
    /** The total value (representing "100% complete"). */
    total: PropTypes.number,
    /** The overall width (in CSS pixels) of the progress bar. */
    barWidth: PropTypes.number,
};

export default ProgressBar;
