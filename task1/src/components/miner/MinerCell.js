import React, { Component } from "react";
import classNames from "classnames";
import CellTypes from "./MinerHelper";

export default class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = { clicked: false };
    }

    handleClick() {
        this.setState({
            clicked: true,
        });

        this.props.handleClick();
    }

    renderTypeSymbol() {
        if (!this.state.clicked) {
            return;
        }

        switch (this.props.type) {
            case CellTypes.bomb:
                return "*";
            case CellTypes.hint:
                return "0";
            case CellTypes.empty:
                return "";
            default:
                return "_";
        }
    }

    render() {
        return (
            <button
                disabled={this.state.clicked}
                className={classNames("miner-cell")}
                onClick={() => this.handleClick()}
            >
                {this.renderTypeSymbol()}
            </button>
        );
    }
}
