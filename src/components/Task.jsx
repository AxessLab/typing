import React, { Fragment, useState, useCallback } from 'react';
import './Task.scss';
import TypingInput from './TypingInput';
import AudioManager from './AudioManager';

const Task = (props) => {
  const [currentPos, setCurrentPos] = useState(0);
  const [errors, setErrors] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [textToType, setTextToType] = useState(props.currentText.charAt(currentPos));
  const [remainingText, setRemainingText] = useState(props.currentText.substr(1,props.currentTextLength));
  const [playURL, setPlayURL] = useState(['']);
  const [playURLIndex, setPlayURLIndex] = useState(0);

  const audioEnded = useCallback (() => {
    console.log("Typing: audioEnded callback.");
    if(setPlayURL.length>playURLIndex) {
      setPlayURLIndex(playURLIndex => playURLIndex +1);
    }
    else {
      console.log("Typing: all queued audio files have finished,");
      setPlayURLIndex(0);
    }
  },
  [], // Tells React to memoize regardless of arguments.
  );

  const resetToDefault = () => {
    setCurrentPos(0);
    setErrors(0);
    setTypedText('');
    setTextToType(props.currentText.charAt(0));
    setRemainingText(props.currentText.substr(1,props.currentTextLength));
    setPlayURL(['']);
    setPlayURLIndex(0);
  }

  const handleCorrectInput = (key) => {
    const tmpRemaining = props.currentText.substr(currentPos+2,props.currentTextLength);

    //Update new values
    setCurrentPos(currentPos => currentPos+1);
    setTypedText(typedText => typedText + key);
    setTextToType(props.currentText.charAt(currentPos+1));
    setRemainingText(remainingText => tmpRemaining);
    setPlayURL(['']);
    setPlayURLIndex(0);

    //play feedback
    setPlayURLIndex(0);
    setPlayURL(['http://webbkonversation.se:59125/process?INPUT_TYPE=TEXT&OUTPUT_TYPE=AUDIO&INPUT_TEXT='+key+'%0A&OUTPUT_TEXT=&VOICE_SELECTIONS=stts_sv_nst-hsmm%20sv%20male%20hmm&AUDIO_OUT=WAVE_FILE&LOCALE=sv&VOICE=stts_sv_nst-hsmm&AUDIO=WAVE_FILE']);

    if(currentPos+1===props.currentTextLength) { //Task complete, play feedback, start next task
      errors === 0 ? alert("Jättebra jobbat! Felfri!") : alert("Bra jobbat! Bara "+errors+" fel.");

      //todo: Instead of resetting values, go to summary of exercise
      resetToDefault();
    }
  }

  const handleWrongInput = (key) => { 
    //play feedback
    setPlayURLIndex(0);
    //addAudioToPlay //does not work for some reason
    setPlayURL(['http://webbkonversation.se:59125/process?INPUT_TYPE=TEXT&OUTPUT_TYPE=AUDIO&INPUT_TEXT='+key+'%0A&OUTPUT_TEXT=&VOICE_SELECTIONS=stts_sv_nst-hsmm%20sv%20male%20hmm&AUDIO_OUT=WAVE_FILE&LOCALE=sv&VOICE=stts_sv_nst-hsmm&AUDIO=WAVE_FILE',
                  'https://webbkonversation.se/audio/buzzer.wav']);

    setErrors(errors => errors + 1);
  }
  
  const addAudioToPlay = (url) => { //does not work for some reason
    setPlayURL(playURL.concat(url));
    console.log('playurl: '+playURL);
    
  }

  const handleKey = e => {
    if(e.which !== 0 && !(e.key==="Control") && !(e.key==="Meta") && !(e.key==="Shift") && !(e.key==="Alt")) { //igore modifiers for now, probably bad code
      //Check is correct key is typed or not
      e.key.toLowerCase() === props.currentText.charAt(currentPos) ? handleCorrectInput(e.key) : handleWrongInput(e.key);
    }
  }

  return (
    <Fragment>
      <h2>Testing role="application"</h2>
      <p>Errors {errors}</p>
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
      <AudioManager playURL={playURL} playURLIndex={playURLIndex} onEnded={audioEnded}/>
    </Fragment>
  );
}
export default Task;