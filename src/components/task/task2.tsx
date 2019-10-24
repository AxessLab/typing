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

export type IProps = IStateProps & IDispatchProps & RouteComponentProps<{ url: string }>;

const Task = props => {
  const {
    task,
    currentPos,
    handleCorrectInput,
    handleWrongInput,
    correctInput,
    wrongInput,
    completed
  } = props;

  const inputElement = useRef<HTMLDivElement | null>(null);
  const audioElement: React.MutableRefObject<HTMLMediaElement | null> = useRef(null);

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
        type: TTS_PLATTFORM.GOOGLE,
        lang: 'sv-SE',
        rate: '2.00',
        pitch: '0.00'
      };


      if (currentPos + 1 === task.text.length && correctKeyPressed) {
        completed(task);
        props.history.push('/summary');
      }

      if (correctKeyPressed) {
        handleCorrectInput(event.key);
        // const startTime = Date.now();

        playAudio(audioElement, 'assets/correct.mp3', 2).then(() => {
          if (currentPos < task.text.length - 1) {
            speak(task.text[currentPos + 1]).then(url => {
              playAudio(audioElement, url, 2).then(() => {

                // const endTime = Date.now();
                // const timeDiff = endTime - startTime;
                // Leaving this in code for now, since benchmarking is ongoing
                // console.log(`Correct feedback using ${textToSpeak.type} for character to write and ${nextTextToSpeak.type} for next character took ${timeDiff} ms.`);

              }).catch(error => console.error('playAudio error', error));
            }).catch(error => console.error('speak error', error));
          }
        }).catch(error => console.error('playAudio error', error));
      } else {
        handleWrongInput(event.key);

        speak(event.key, textToSpeak).then(text => {
          playAudio(audioElement, text, 2).then(() => {
            playAudio(audioElement, '/assets/wrongsound.mp3', 2)
              .catch(error => console.error('playAudio error', error));
          }).catch(error => console.error('playAudio error', error));
         }).catch(error => console.error('speak error', error));
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
              className="task__input"
              ref={inputElement}
              role="textbox"
              tabIndex={0}
              onKeyUp={handleKey}>
                <span className={"task__typed-text" +  (correctInput ? '--correct' : '') + (wrongInput ? '--wrong' : '')}>
                  { task.typedText }
                </span>
            </div>
            <audio id="player" ref={audioElement} src="" autoPlay />
          </div>
        </div>
      </div>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Task);
