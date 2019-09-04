import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';

  class Task extends React.Component {
    constructor(props) {
      super(props);
      this.currentPosition=0;
      this.errors=0;
      this.state = { typedValue : "", 
                     doneText : "",
                     remainingText : props.currentText } 
    }

    handleChange = e => {
      this.setState({typedValue: e.target.value});
    }

    handleKey = e => {
      console.log("Pressed: "+e.key+" = "+this.props.currentText.charAt(this.currentPosition)+"?");
      if(e.which !== 0 && !(e.key==="Control") && !(e.key==="Meta") && !(e.key==="Shift") && !(e.key==="Alt")) { //igore modifiers for now, probably bad code
        if(e.key==this.props.currentText.charAt(this.currentPosition)) { //Correct, play feedback (maybe), update progress and move to the next letter
          this.currentPosition++;
          console.log("Current position: "+this.currentPosition+" length: "+this.props.currentTextLength);
          if(this.currentPosition==this.props.currentTextLength) { //Task complete, play feedback, start next task
            if(this.errors==0) {
                alert("Jättebra jobbat! Felfri!");
            }
            else {
                alert("Bra jobbat! Bara "+this.errors+" fel.");
            }
            this.currentPosition=0; 
            this.errors=0;
            this.setState({typedValue: ""});
          }
          //Update progress
          const tmpDone = this.props.currentText.substr(0,this.currentPosition);
          const tmpRemaining = this.props.currentText.substr(this.currentPosition,this.props.currentTextLength);
          this.setState({ doneText: tmpDone});
          this.setState({ remainingText: tmpRemaining}); 
        }
        else { //Incorrect, play feedback, remove last letter from input
          this.errors++;
          const tmpStr = this.state.typedValue;
          const cutStr = tmpStr.substr(0, tmpStr.length-1);
          this.setState({typedValue: cutStr});
        }
      }
    }

    render() {
      return (
        <label><span style={{color: 'white', backgroundColor: 'black'}}>{this.state.doneText}</span>
        <span>{this.state.remainingText}</span><br></br>
        <input type="text" 
              name="TypeHereForm"
              id="typeHereId" 
              value={this.state.typedValue} 
              onChange={this.handleChange}
              onKeyUp={this.handleKey}
              autoFocus>
        </input>
        </label>
      );
    }

  }

  
  class Game extends React.Component {
    constructor(props) {
      super(props);
      this.currentText="fjfj"; //Init training task
    }

    render() {
      return (
        <div className="game" style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)'
      }}>
          <div className="type-here">
            <Task currentText={this.currentText} currentTextLength={this.currentText.length}/>
          </div>
        </div>
      );
    }
  }
  

ReactDOM.render(<Game />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
