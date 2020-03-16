import React from 'react';
import Heading from './heading';
import Footer from './footer';
import GameContainer from './game-container';

function Container() {
  return (
    <div className="container">
      <Heading />
      <GameContainer />
      <Footer />
    </div>
  );
}

export default Container;
