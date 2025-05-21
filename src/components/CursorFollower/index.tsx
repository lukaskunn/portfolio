import React from "react";
import { useCursor } from "../../contexts/CursorContext"
import cursorFollowerStyles from "./CursorFollower.module.scss";

function CursorFollower() {
    const { hoverImportantText, position } = useCursor();

    return (
        <div
            className={cursorFollowerStyles["white-circle"]}
            style={{
                top: position.y,
                left: position.x,
                width: hoverImportantText ? "100px" : "40px",
                height: hoverImportantText ? "100px" : "40px",
            }}
        />
    );
}

export default CursorFollower;
