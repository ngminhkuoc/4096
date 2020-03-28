import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../header';
import Footer from '../footer';
import GameContainer from './game-container';
import * as GameActions from '../../actions/game-actions';
import * as InputManager from '../../reducers/input-manager';

class Container extends Component {

  componentDidMount() {
    const { actions } = this.props;

    InputManager.listen();
    InputManager.on("move", actions.move);
    InputManager.on("restart", actions.newGame);
    
    actions.loadGame();
  }
  
  componentWillUnmount() {
    document.removeEventListener("keydown", this.movingFunction, false);
  }

  render() {
    const { games, actions } = this.props;

    return (
      <div className="container" >
        <Header newGame={actions.newGame} score={games.score} bestScore={games.bestScore} />
        <GameContainer won={games.won} over={games.over} tryAgain={actions.newGame} keepPlaying={actions.keepPlaying} />
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    games: state.gameReducer,
    state: state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(GameActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);