import React, { Component, Fragment } from "react";
import MinerCell from "./MinerCell";
import "./Miner.css";
import {
    CellTypes,
    MarksTypes,
    generateField,
    updateField,
    updateFieldMark,
} from "./MinerHelper";
import classNames from "classnames";

export default class MinerField extends Component {
    constructor(props) {
        super(props);
        this.state = { field: generateField(), gameOver: false };
    }

    handleCellOpen = cell => {
        const { field } = this.state;
        this.setState({ field: updateField(field, cell) });

        if (cell.type === CellTypes.bomb) {
            this.setState({ gameOver: true });
        }
    };

    handleCellMark = (cell, event) => {
        event.preventDefault();

        const { field } = this.state;
        this.setState({ field: updateFieldMark(field, cell) });
    };

    handleRestartClick = () => {
        this.setState({ field: generateField(), gameOver: false });
    };

    render() {
        const { field, gameOver } = this.state;
        const gameOverClassName = classNames(
            "game-over-block",
            gameOver ? "show" : null
        );

        return (
            <Fragment>
                <div className={gameOverClassName}>
                    <div className="game-over-message">Game Over</div>
                </div>
                <div className="miner-field">
                    {field.map((cells, row) => (
                        <div key={row} className="miner-field-row">
                            {cells.map(cell => (
                                <MinerCell
                                    key={cell.id}
                                    data={cell}
                                    handleOpen={this.handleCellOpen}
                                    handleMark={this.handleCellMark}
                                />
                            ))}
                        </div>
                    ))}
                </div>
                <button
                    className="button button-miner_restart"
                    onClick={this.handleRestartClick}
                >
                    Restart
                </button>
            </Fragment>
        );
    }
}
