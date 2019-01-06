import React, { Component } from 'react';

export default class Tile extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = { clickCounter: 0 };
  }

  clickCounter = 0;

  handleClick(e) {
    //e.target.className 

    this.setState({clickCounter: this.state.clickCounter+1 });
  }

  render() {
    return (
      <div className="tile" onClick={this.handleClick}>
        <div>
          { (this.state.clickCounter === 0) ? 'not clicked yet' : `clicked: ${this.state.clickCounter} times` }
        </div>
      </div>
    );
  }
}
