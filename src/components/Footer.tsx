// Vendors
import React from "react";
import { Link } from "react-router-dom";

interface FooterProps {
    isVisible: boolean;
}

/**
 * The app footer.
 *
 * Renders the app-wide footer bar, including navigation buttons.
 *
 * @returns {ReactElement} The `<Footer />` component.
 */
export default function Footer({ isVisible }: FooterProps) {
    return (
        <div className={"footer" + (isVisible ? " visible" : " hidden")}>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Current</Link>
                    </li>
                    <li>
                        <Link to="/forecast">Forecast</Link>
                    </li>
                    <li>
                        <Link to="/settings">Settings</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

Footer.propTypes = {};
