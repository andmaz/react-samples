import React, { Component } from "react";
import Tile from "./Tile";
import "./Tiles.css";

export default class TileTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tiles: [...Array(9).keys()],
        };
    }

    render() {
        const { tiles } = this.state;
        return (
            <div className="tileTable">
                {tiles.map(id => (
                    <Tile key={id} />
                ))}
            </div>
        );
    }
}
