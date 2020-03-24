import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../components/header';
import Footer from '../components/footer';
import GameContainer from './game-container';
import * as GameActions from '../actions/game-actions';

class Container extends Component {
  render() {
    const { games, grid, actions } = this.props;

    return (
      <div className="container" >
        <Header newGame={actions.newGame} />
        <GameContainer won={false} over={false} />
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    games: state.gameReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(GameActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);