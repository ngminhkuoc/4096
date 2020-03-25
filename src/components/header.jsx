import React, { Component } from "react";

export default class Header extends Component {
    handleNewGame = () => {
        this.props.newGame();
    }

    render() {
        const { score, bestScore } = this.props;
        return (
            <>
                <div className="heading">
                    <h1 className="title">4096</h1>
                    <div className="scores-container">
                        <div className="score-container">{score}</div>&nbsp;
                        <div className="best-container">{bestScore}</div>
                    </div>
                </div>
                <div className="above-game">
                    <p className="game-intro">Join the numbers and get to the <strong>4096 tile!</strong></p>
                    <button className="restart-button" onClick={this.handleNewGame}>New Game</button>
                </div>
            </>
        )
    }
}