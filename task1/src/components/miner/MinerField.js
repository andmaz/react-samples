import React, { Component } from "react";
import MinerCell from "./MinerCell";
import "./Miner.css";
import { fillField } from "./MinerHelper";

export default class MinerField extends Component {
    constructor(props) {
        super(props);

        this.width = 10;
        this.height = 10;

        this.state = { field: fillField(this.width, this.height) };
    }

    handleClick() {}

    render() {
        return (
            <div className="miner-field">
                {this.state.field.map((cell, row) => (
                    <div key={row} className="miner-field-row">
                        {cell.map((c, col) => (
                            <MinerCell
                                key={c.id}
                                type={c.type}
                                className="miner-field-cell"
                                handleClick={() => this.handleClick()}
                            />
                        ))}
                    </div>
                ))}
            </div>
        );
    }
}
