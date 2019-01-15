import React, { Component } from "react";
import classNames from "classnames";
import CellTypes from "./MinerHelper";

export default class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = { clicked: true };
    }

    handleClick = () => {
        // this.setState({
        //     clicked: false,
        // });

        this.props.handleClick(this.props.data);
    };

    renderTypeSymbol() {
        const { type, value, open } = this.props;

        if (!open) {
            return;
        }

        switch (type) {
            case CellTypes.bomb:
                return "*";
            case CellTypes.hint:
                return value;
            case CellTypes.empty:
                return "";
            default:
                return "_";
        }
    }

    render() {
        const { open, type } = this.props;
        const className = classNames("miner-cell", {
            bomb: type === CellTypes.bomb,
        });

        return (
            <button
                disabled={open}
                className={className}
                onClick={this.handleClick}
            >
                {this.renderTypeSymbol()}
            </button>
        );
    }
}
