import React, { Component, Fragment } from "react";
import MinerCell from "./MinerCell";
import "./Miner.css";
import { generateField, updateFieldOpen, updateFieldMark } from "./MinerHelper";
import classNames from "classnames";

export default class MinerField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            field: generateField(),
            gameOver: false,
            gameWon: false,
        };
    }

    handleCellOpen = cell => {
        const { field } = this.state;
        const newFieldInfo = updateFieldOpen(field, cell);

        this.setState({
            field: newFieldInfo.field,
            gameOver: newFieldInfo.gameOver,
            gameWon: newFieldInfo.gameWon,
        });
    };

    handleCellMark = (cell, event) => {
        event.preventDefault();

        const { field } = this.state;
        const newFieldInfo = updateFieldMark(field, cell);

        this.setState({
            field: newFieldInfo.field,
            gameOver: newFieldInfo.gameOver,
            gameWon: newFieldInfo.gameWon,
        });
    };

    handleRestartClick = () => {
        this.setState({
            field: generateField(),
            gameOver: false,
            gameWon: false,
        });
    };

    render() {
        const { field, gameOver, gameWon } = this.state;
        const gameOverClassName = classNames("game-notification-block", {
            "game-over": gameOver,
            "game-won": gameWon,
        });

        return (
            <Fragment>
                <div className={gameOverClassName}>
                    <div className="game-notification-message game-over-message">
                        Game Over
                    </div>
                    <div className="game-notification-message game-won-message">
                        You Won!
                    </div>
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
