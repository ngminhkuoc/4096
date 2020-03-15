import React, { Component } from "react";

export default class Heading extends Component {
    newGame(){
        alert('a');
    }
    render() {
        return (
            <>
                <div className="heading">
                    <h1 className="title">4096</h1>
                    <div className="scores-container">
                        <div className="score-container">0</div>&nbsp;
                        <div className="best-container">0</div>
                    </div>
                </div>
                <div className="above-game">
                    <p className="game-intro">Join the numbers and get to the <strong>4096 tile!</strong></p>
                    <button className="restart-button" onclick={() => this.newGame()}>New Game</button>
                </div>
            </>
        )
    }
}