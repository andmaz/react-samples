import React, { Component, Fragment } from "react";
import logo from "./img.png";
import "./App.css";
import TileTable from "./components/tiles/TileTable";
import MinerField from "./components/miner/MinerField";
import classNames from "classnames";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.tabs = [
            { name: "tiles", view: () => <TileTable /> },
            { name: "miner", view: () => <MinerField /> },
        ];
        this.state = {
            activeTab: 1,
        };
    }

    handleTabClick(tab) {
        this.setState({ activeTab: tab });
    }

    renderHeader() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Task {this.state.activeTab + 1}:{" "}
                    {this.tabs[this.state.activeTab].name}
                </p>
            </header>
        );
    }

    renderTabs() {
        const { activeTab } = this.state;
        return (
            <Fragment>
                {this.tabs.map((tab, tabNumber) => (
                    <button
                        key={tabNumber}
                        onClick={() => this.handleTabClick(tabNumber)}
                        className={classNames("tab", {
                            active: activeTab === tabNumber,
                        })}
                    >
                        {tab.name}
                    </button>
                ))}
                <span className="tabs-hint">Happy now?</span>
            </Fragment>
        );
    }

    render() {
        return (
            <div className="App">
                {this.renderHeader()}
                {this.renderTabs()}
                {this.tabs[this.state.activeTab].view()}
            </div>
        );
    }
}
