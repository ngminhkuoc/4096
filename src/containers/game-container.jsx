import React, { Component } from "react";
import GridContainer from "../components/grid-container";
import TileContainer from "./tile-container";
var classNames = require('classnames');

export default class GameContainer extends Component {
    render() {
        var classes_ = classNames('game-message', {
            'game-won': this.props.won,
            'game-over': this.props.over
        });
        var message = this.props.won ? "You win!" : "Game over!";
        return (
            <div className="game-container">
                <div className={classes_}>
                    <p>{message}</p>
                    <div className="lower">
                        <button className="keep-playing-button">Keep going</button>
                        <button className="retry-button">Try again</button>
                    </div>
                </div>
                <GridContainer />
                <TileContainer />
            </div>
        )
    }
}