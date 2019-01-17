import React from "react";
import classNames from "classnames";
import { CellTypes, MarksTypes } from "./MinerHelper";

const cellTypesClasses = {
    [CellTypes.bomb]: "bomb",
    [CellTypes.hint]: "hint",
    [CellTypes.empty]: "empty",
};

const cellMarksClasses = {
    [MarksTypes.bomb]: "bombMark",
    [MarksTypes.unknown]: "unknownMark",
};

export default function Cell(props) {
    const { open, type, value, markType } = props.data;
    const handleOpen = props.handleOpen.bind(this, props.data);
    const handleMark = props.handleMark.bind(this, props.data);

    const classes = classNames(
        "miner-cell",
        cellTypesClasses[type],
        cellMarksClasses[markType],
        { open }
    );

    return (
        <button
            className={classes}
            disabled={open}
            onContextMenu={handleMark}
            onClick={handleOpen}
        >
            {open ? value : null}
        </button>
    );
}
