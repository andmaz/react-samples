import React, { Component, Fragment } from "react";
import MinerCell from "./MinerCell";
import "./Miner.css";
import CellTypes, { fillField, updateField } from "./MinerHelper";

export default class MinerField extends Component {
    constructor(props) {
        super(props);
        this.state = { field: fillField() };
    }

    handleCellClick = cell => {
        console.log("MinerField : handleCellClick");

        this.setState({ field: updateField(this.state.field, cell) });

        if (cell.type === CellTypes.bomb) {
            alert("Came over");
        }
    };

    handleRestartClick = () => {
        this.setState({ field: fillField() });
    };

    render() {
        const { field } = this.state;

        return (
            <Fragment>
                <div className="miner-field">
                    {field.map((cells, row) => (
                        <div key={row} className="miner-field-row">
                            {cells.map(cell => (
                                <MinerCell
                                    key={cell.id}
                                    type={cell.type}
                                    value={cell.value}
                                    data={cell}
                                    open={cell.open}
                                    className="miner-field-cell"
                                    handleClick={this.handleCellClick}
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
