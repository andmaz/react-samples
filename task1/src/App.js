import React, { Component } from 'react';
import logo from './img.png';
import './App.css';
import TileTable from './components/TileTable';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Task 1: Tiles</p>
        </header>
        <TileTable />
      </div>
    );
  }
}

export default App;
