import './task.scss';

import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../../shared/reducers';
import { RouteComponentProps } from 'react-router-dom';

import { handleCorrectInput, handleWrongInput, completed } from './task.reducer';

import { playAudio } from '../audio/audio';
import { speak, ITTS, TTS_PLATTFORM, } from '../tts/tts';


const mapStateToProps = ({ task }: IRootState) => ({
  task: task.entity,
  currentPos: task.currentPos,
  correctInput: task.correctInput,
  wrongInput: task.wrongInput,
});

const mapDispatchToProps = {
  handleCorrectInput,
  handleWrongInput,
  completed
};

type IStateProps = ReturnType<typeof mapStateToProps>;
type IDispatchProps = typeof mapDispatchToProps;
interface IOwnProps {
  history: RouteComponentProps<{ url: string }>['history']
}

export type IProps = IStateProps & IDispatchProps & IOwnProps;

const Task = (props): React.ReactElement => {
  const {
    task, currentPos,
    handleCorrectInput, handleWrongInput,
    correctInput, wrongInput,
    completed, history
  } = props;

  const inputElement = useRef<HTMLDivElement>(null);
  const audio: React.MutableRefObject<HTMLMediaElement | null> = useRef(null);

  useEffect(() => {
    if (inputElement && inputElement.current) {
      inputElement.current.focus();
    }
  })

  const handleKey = (event: React.KeyboardEvent): void => {
    if (event.which !== 0 && !['Control', 'Meta', 'Shift', 'Alt'].some((modifier: string): boolean => event.key === modifier)) {

      // Check is correct key is typed or not
      const correctKeyPressed = event.key.toLowerCase() === task.text.charAt(currentPos);

      // Select voices
      // GOOGLE / Mary / WEBSPEECH
      const textToSpeak: ITTS = {
        type: TTS_PLATTFORM.WEBSPEECH,
        lang: 'sv-SE',
        text: event.key,
      };

      const nextTextToSpeak: ITTS = {
        type: TTS_PLATTFORM.WEBSPEECH,
        lang: 'sv-SE',
        text: ''
      }

      if(currentPos < task.text.length - 1) {
        nextTextToSpeak.text = task.text[currentPos + 1];
      }

      if (currentPos + 1 === task.text.length && correctKeyPressed) {
        completed(task);
        history.push('/summary');
      }

      if (correctKeyPressed) {
        handleCorrectInput(event.key);
        let startTime = Date.now();
        //speak(textToSpeak).then( data => {
          //playAudio(audio, data).then( data => {
            playAudio(audio, 'assets/correct.mp3').then( data => {
              if(currentPos < task.text.length - 1) {
                speak(nextTextToSpeak).then( data => {
                  playAudio(audio, data).then( data => {
                    let endTime = Date.now();
                    let timeDiff = endTime - startTime; //in ms
                    console.log("Correct feedback using "+textToSpeak.type+" for character to write and "
                    +nextTextToSpeak.type+" for next character took "+timeDiff+'ms');
                  });
                });
              }
            });
          //});
        //});
      }
      else {
        handleWrongInput(event.key);
          speak(textToSpeak).then( data => {
              playAudio( audio, data ).then( data => {
                playAudio(audio, '/assets/wrongsound.wav');
              });
         });
      }
    }
  }

  return (
    <>
      <div className="task pad-top-60">
        <div className="flex-m flex-wrap-m">
          <div className="col-12">
            <h1>Typing in the Dark</h1>
          </div>
          <div className={"col-2 task__value-to-type task__value-to-type" + (correctInput ? '--correct' : '') + (wrongInput ? '--wrong' : '')} aria-live="polite">
            <span>{ task.text.charAt(currentPos) }</span>
          </div>
          <div className="col-10 task__remaining-text">
            { task.text.substr(currentPos + 1, task.text.length) }
          </div>
          <div className="col-12 col-2-m pad-top-30">
            <div
              contentEditable
              className="task__input"
              role="application"
              ref={inputElement}
              tabIndex={0}
              onKeyUp={handleKey}>
                <span className={"task__typed-text" +  (correctInput ? '--correct' : '') + (wrongInput ? '--wrong' : '')}>
                  { task.typedText }
                </span>
            </div>
            <audio id="Player" ref={audio} src="" autoPlay />
          </div>
        </div>
      </div>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Task);
