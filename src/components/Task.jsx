import React, { Fragment } from 'react';
import './Task.scss';

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.currentPosition = 0;
    this.errors=0;
    this.state = { 
      typedValue : "",
      valueToType: props.currentText.charAt(this.currentPosition), 
      doneText : "",
      remainingText : props.currentText.substr(1,this.props.currentTextLength),
    } 
  }

  componentDidMount() {
    this.input.current.focus();
  }

  handleKey = e => {
    console.log("Pressed: "+e.key+" = "+this.props.currentText.charAt(this.currentPosition)+"?");
    if(e.which !== 0 && !(e.key==="Control") && !(e.key==="Meta") && !(e.key==="Shift") && !(e.key==="Alt")) { //igore modifiers for now, probably bad code
      if(e.key=== this.props.currentText.charAt(this.currentPosition)) { //Correct, play feedback (maybe), update progress and move to the next letter
        this.currentPosition++;
        this.setState({
          typedValue: this.state.typedValue + e.key,
          valueToType: this.props.currentText.charAt(this.currentPosition)
        });
        console.log("Current position: "+this.currentPosition+" length: "+this.props.currentTextLength);
        if(this.currentPosition===this.props.currentTextLength) { //Task complete, play feedback, start next task
          this.errors === 0 ? alert("Jättebra jobbat! Felfri!") :  alert("Bra jobbat! Bara "+this.errors+" fel.");

          //Resetting values
          this.currentPosition=0; 
          this.errors=0;
          this.setState({typedValue: "",valueToType: this.props.currentText.charAt(this.currentPosition)});
        }
        //Update progress
        const tmpDone = this.props.currentText.substr(0,this.currentPosition);
        const tmpRemaining = this.props.currentText.substr(this.currentPosition+1,this.props.currentTextLength);
        this.setState({ 
          doneText: tmpDone, 
          remainingText: tmpRemaining});
      }
      else { //Incorrect
        this.errors++;

        //todo: Play error audio feedback
      }
    }
  }

  render() {
    return (
      <Fragment>
        <h2>Testing role="application"</h2>
        <div 
          className="typing-text-input" 
          role="application" 
          ref={this.input} 
          tabIndex="0" 
          onKeyUp={this.handleKey}
          aria-label={'Type the text ' + this.state.valueToType}>
            <span className="typing-text-input__typed-value">
                {this.state.typedValue}
            </span>
            <span 
              className="typing-text-input__value-to-type">
                {this.state.valueToType}
            </span>
            <span>{this.state.remainingText}</span>
        </div>
      </Fragment>
    );
  }
}

export default Task;