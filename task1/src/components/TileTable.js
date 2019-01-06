import React, { Component } from 'react';
import Tile from './Tile'

export default class TileTable extends Component {

  tilesCount = 9;

  render() {
    return (
      <div className="tileTable">
        {this.createTiles()}
      </div>
    );
  }

  createTiles = () => {
    var res = [];
    for (var i = 0; i < this.tilesCount; i++) {
      res.push(<Tile key={i} name={`tile ${i}`} />);
    }
    return res;
  }

}