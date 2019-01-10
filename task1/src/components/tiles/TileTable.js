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
        return (
            <div className="tileTable">
                {this.state.tiles.map(id => (
                    <Tile key={id} />
                ))}
            </div>
        );
    }
}
