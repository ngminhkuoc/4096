import React from 'react';
import Heading from './heading';
import Footer from './footer';
import GameContainer from './game-container';

function Container(props) {
  return (
    <div className="container">
      <Heading />
      <GameContainer size={props.size} won={false} over={false}/>
      <Footer />
    </div>
  );
}

export default Container;
