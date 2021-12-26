import React from "react";

function Overlay({ visible, children }) {
    return (
        <div className={visible ? "overlay" : "overlay hidden"}>
            <div className="content">{children}</div>
        </div>
    );
}

export default Overlay;
