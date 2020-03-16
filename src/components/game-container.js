import React, { Component } from "react";
import GridContainer from "./grid-container";
import TileContainer from "./tile-container";

export default class GameContainer extends Component {
    render() {
        var classes_ = classnames('game-message', {
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