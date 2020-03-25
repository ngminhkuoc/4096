import React, { Component } from "react";
import GridBackGround from "../components/grid-background";
import TileContainer from "./tile-container";
var classNames = require('classnames');

export default class GameContainer extends Component {
    handleTryAgain = () => {
        this.props.tryAgain();
    }
    
    handleKeepPlaying = () => {
        this.props.keepPlaying();
    }

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
                        <button className="keep-playing-button" onClick={this.handleKeepPlaying}>Keep going</button>
                        <button className="retry-button" onClick={this.handleTryAgain}>Try again</button>
                    </div>
                </div>
                <GridBackGround />
                <TileContainer />
            </div>
        )
    }
}