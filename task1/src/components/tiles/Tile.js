import React, { Component } from "react";
import classNames from "classnames";

export default class Tile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clickCounter: 0,
            highlight: false,
        };
    }

    handleClick = () => {
        this.setState({
            clickCounter: this.state.clickCounter + 1,
            highlight: false,
        });

        setTimeout(() => this.setState({ highlight: true }));
    }

    render() {
        const {clickCounter, highlight} = this.state;
        return (
            <div
                className={classNames("tile", {highlight})}
                onClick={this.handleClick}
            >
                <div>
                    {clickCounter === 0
                        ? "not clicked yet"
                        : `clicked: ${clickCounter} times`}
                </div>
            </div>
        );
    }
}
