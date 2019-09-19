import React, { Fragment, useState } from 'react';
import './Task.scss';
import TypingInput from './TypingInput';

const Task = (props) => {
  const getInitialState = () => {
    return ({
      currentPos: 0, 
      errors: 0,
      typedText: '',
      textToType: props.currentText.charAt(0),
      remainingText: props.currentText.substr(1,props.currentTextLength)
    })
  }

  const [state, setState] = useState(getInitialState());

  const handleCorrectInput = (key) => {
    const tmpRemaining = props.currentText.substr(state.currentPos+2,props.currentTextLength);

    //Update new values
    setState({
      ...state,
      currentPos: state.currentPos + 1,
      typedText: state.typedText + key,
      textToType: props.currentText.charAt(state.currentPos+1),
      remainingText: tmpRemaining
    });

    if(state.currentPos+1===props.currentTextLength) { //Task complete, play feedback, start next task
      state.errors === 0 ? alert("Jättebra jobbat! Felfri!") : alert("Bra jobbat! Bara " + state.errors + " fel.");

      //todo: Instead of resetting values, go to summary of exercise
      setState({...state,...getInitialState()});
    }
  }

  const handleWrongInput = () => setState({...state, errors: state.errors + 1})

  const handleKey = e => {
    if(e.which !== 0 && !(e.key==="Control") && !(e.key==="Meta") && !(e.key==="Shift") && !(e.key==="Alt")) { //igore modifiers for now, probably bad code
      //Check is correct key is typed or not
      e.key.toLowerCase() === props.currentText.charAt(state.currentPos) ? handleCorrectInput(e.key) : handleWrongInput();
    }
  }
  return (
    <Fragment>
      <h2>Testing role="application"</h2>
      <p>Errors {state.errors}</p>
      <TypingInput handleKey={handleKey} valueToType={state.textToType}>
          <span className="typing-text-input__typed-value">
              {state.typedText}
          </span>
          <span 
            className="typing-text-input__value-to-type">
              {state.textToType}
          </span>
          <span>{state.remainingText}</span>
      </TypingInput>
    </Fragment>
  );
}
export default Task;