import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../header';
import Footer from '../footer';
import GameContainer from './game-container';
import * as GameActions from '../../actions/game-actions';
import { KEYCODE } from '../../constants/app-constants'

class Container extends Component {
  constructor(props) {
    super(props);
    this.movingFunction = this.movingFunction.bind(this);
  }

  movingFunction(event) {
    const { actions } = this.props;
    if ([KEYCODE.UP, KEYCODE.DOWN, KEYCODE.LEFT, KEYCODE.RIGHT].includes(event.keyCode)) {
      event.preventDefault();
      actions.move(event.keyCode);
    }
  }
  componentDidMount() {
    document.addEventListener("keydown", this.movingFunction, false);
    const { actions } = this.props;
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