import React from 'react';
import Task from './Task';
import './Game.scss';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.currentText="fjfj"; //Init training task
  }

  render() {
    return (
      <div className="game">
        <div className="type-here">
          <Task currentText={this.currentText} currentTextLength={this.currentText.length}/>
        </div>
      </div>
    );
  }
}

export default Game;