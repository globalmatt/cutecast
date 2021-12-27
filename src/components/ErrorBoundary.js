// Vendors
import React from "react";
import PropTypes from "prop-types";

/**
 * An error boundary component.
 *
 * A wrapper component to catch React lifecycle errors gracefully.
 *
 * @see
 * https://stackoverflow.com/questions/31111771/can-you-catch-all-errors-of-a-react-js-app-with-a-try-catch-block
 *
 * @returns {ReactElement} The `<ErrorBoundary />` component.
 */
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error, info) {
        console.log("componentDidCatch");
        // Display fallback UI
        this.setState({ hasError: true });
        // You can also log the error to an error reporting service
        //logErrorToMyService(error, info);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>;
        }
        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    /** The child elements to display inside the component (typically
     * this will be the entire app). */
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default ErrorBoundary;
