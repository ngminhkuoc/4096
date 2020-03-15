import React, { Component } from "react";

export default class Footer extends Component {
    render() {
        return (
            <>
                <p className="game-explanation">
                    <strong className="important">How to play:</strong> Use your <strong>arrow keys</strong> to move the tiles. When two
    tiles with the same number touch, they <strong>merge into one!</strong>
                </p>
                <hr />
                <p>Created by <a href="https://quocnguyen.dev" rel="noopener noreferrer" target="_blank">Quoc Nguyen</a>.&nbsp;
        A clone of <a href="https://github.com/gabrielecirulli/2048" rel="noopener noreferrer" target="_blank">2048</a>&nbsp;
        by <a href="http://gabrielecirulli.com" rel="noopener noreferrer" target="_blank">Gabriele Cirulli</a>&nbsp;
        written using <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React</a>.</p>
            </>
        )
    }
}