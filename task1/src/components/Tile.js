import React, { Component } from 'react';
import classNames from 'classnames';

export default class Tile extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = { clickCounter: 0, highlight: false };
  }

  handleClick() {
    this.setState({ 
      clickCounter: this.state.clickCounter + 1,
      highlight: false
    });

    setTimeout(() => this.setState({ highlight: true }));

  }

  render() {
    return (
      <div className={classNames('tile', { 'highlight': this.state.highlight })} onClick={this.handleClick}>
        <div>
          { 
            (this.state.clickCounter === 0) 
              ? 'not clicked yet' 
              : `clicked: ${this.state.clickCounter} times` 
          }
        </div>
      </div>
    );
  }
}
