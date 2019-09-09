import React, { Fragment } from 'react';
import './Task.scss';

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
      if(e.key===this.props.currentText.charAt(this.currentPosition)) { //Correct, play feedback (maybe), update progress and move to the next letter
        this.currentPosition++;
        console.log("Current position: "+this.currentPosition+" length: "+this.props.currentTextLength);
        if(this.currentPosition===this.props.currentTextLength) { //Task complete, play feedback, start next task
          this.errors === 0 ? alert("Jättebra jobbat! Felfri!") :  alert("Bra jobbat! Bara "+this.errors+" fel.");

          //Resetting values
          this.currentPosition=0; 
          this.errors=0;
          this.setState({typedValue: ""});
        }
        //Update progress
        const tmpDone = this.props.currentText.substr(0,this.currentPosition);
        const tmpRemaining = this.props.currentText.substr(this.currentPosition,this.props.currentTextLength);
        this.setState({ doneText: tmpDone, remainingText: tmpRemaining});
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
      <Fragment>
        <label htmlFor="TypeHereForm">
          <span className="done-text">{this.state.doneText}</span>
          <span>{this.state.remainingText}</span>
        </label>
        <input type="text" 
              name="TypeHereForm"
              id="typeHereId" 
              value={this.state.typedValue} 
              onChange={this.handleChange}
              onKeyUp={this.handleKey}
              autoFocus>
        </input>
      </Fragment>
    );
  }

}

export default Task;