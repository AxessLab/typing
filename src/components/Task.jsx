import React, { Fragment, useState } from 'react';
import './Task.scss';
import TypingInput from './TypingInput';

const Task = (props) => {
  const [currentPos, setCurrentPos] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [textToType, setTextToType] = useState(props.currentText.charAt(currentPos));
  const [remainingText, setRemainingText] = useState(props.currentText.substr(1,props.currentTextLength));
  const [errors, setErrors] = useState(0);

  const resetToDefault = () => {
    setCurrentPos(0);
    setErrors(0);
    setTypedText('');
    setTextToType(props.currentText.charAt(0));
    setRemainingText(props.currentText.substr(1,props.currentTextLength));
  }

  const handleCorrectInput = (key) => {
    const tmpRemaining = props.currentText.substr(currentPos+2,props.currentTextLength);

    //Update new values
    setCurrentPos(currentPos+1);
    setTypedText(typedText + key);
    setTextToType(props.currentText.charAt(currentPos+1));
    setRemainingText(tmpRemaining);

    if(currentPos+1===props.currentTextLength) { //Task complete, play feedback, start next task
      errors === 0 ? alert("Jättebra jobbat! Felfri!") : alert("Bra jobbat! Bara "+errors+" fel.");

      //todo: Instead of resetting values, go to summary of exercise
      resetToDefault();
    }
  }

  const handleWrongInput = () => setErrors(errors + 1)

  const handleKey = e => {
    if(e.which !== 0 && !(e.key==="Control") && !(e.key==="Meta") && !(e.key==="Shift") && !(e.key==="Alt")) { //igore modifiers for now, probably bad code
      //Check is correct key is typed or not
      e.key.toLowerCase() === props.currentText.charAt(currentPos) ? handleCorrectInput(e.key) : handleWrongInput();
    }
  }
  return (
    <Fragment>
      <h2>Testing role="application"</h2>
      <p>CurrentPos {currentPos}</p>
      <p>Errors {errors}</p>
      <p>TypedText {typedText}</p>
      <p>TextToType {textToType}</p>
      <p>remainingText {remainingText}</p>
      
      <TypingInput handleKey={handleKey} valueToType={textToType}>
          <span className="typing-text-input__typed-value">
              {typedText}
          </span>
          <span 
            className="typing-text-input__value-to-type">
              {textToType}
          </span>
          <span>{remainingText}</span>
      </TypingInput>
    </Fragment>
  );
}
export default Task;