import './task.scss';
import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../../shared/reducers';
import { RouteComponentProps } from 'react-router-dom';
import { handleCorrectInput, handleWrongInput, completed } from './task.reducer';
import { speak, ITTS } from '../tts/tts';
import { assetBaseUrl } from '../../config/audio';

const mapStateToProps = ({ task }: IRootState) => ({
  task: task.entity,
  currentPos: task.currentPos,
  correctInput: task.correctInput,
  wrongInput: task.wrongInput
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
    correctInput,
    wrongInput
  } = props;

  const inputElement = useRef<HTMLDivElement | null>(null);
  const audioElement: React.MutableRefObject<HTMLMediaElement | null> = useRef<HTMLMediaElement | null>(null);
  const correctAudioElement: React.MutableRefObject<HTMLMediaElement | null> = useRef<HTMLMediaElement | null>(null);
  const wrongAudioElement: React.MutableRefObject<HTMLMediaElement | null> = useRef<HTMLMediaElement | null>(null);

  // Action declaration to avoid shadowing
  const handleCorrectInputAction = props.handleCorrectInput;
  const handleWrongInputAction = props.handleWrongInput;
  const completedAction = props.completed;

  useEffect(() => {
    if (inputElement && inputElement.current) {
      inputElement.current.focus();
    }
  });

  const handleKey = (event: React.KeyboardEvent): void => {
    if (event.which !== 0 &&
      audioElement.current &&
      correctAudioElement.current &&
      wrongAudioElement.current &&
      !['Control', 'Meta', 'Shift', 'Alt'].some((modifier: string): boolean => event.key === modifier)
    ) {
      audioElement.current.pause();
      audioElement.current.setAttribute('src', '');
      audioElement.current = new Audio();
      correctAudioElement.current.load();
      wrongAudioElement.current.load();

      // Check is correct key is typed or not
      const correctKeyPressed = event.key.toLowerCase() === task.text.charAt(currentPos);

      // TODO: Maybe rename this variable?
      const ttsOptions: ITTS = { rate: 2 };

      if (currentPos + 1 === task.text.length && correctKeyPressed) {
        completedAction(task);
        props.history.push('/summary');
      }

      if (correctKeyPressed) {
        handleCorrectInputAction(event.key).then(() => {
          if (correctAudioElement.current) {
            correctAudioElement.current.setAttribute('currentTime', '0');
            const p = correctAudioElement.current.play().then(() => {
              if (p !== undefined) {
                if (currentPos < task.text.length - 1) {
                  speak(task.text[currentPos + 1], ttsOptions).then(textURL => {
                    if (textURL !== '' && audioElement.current) {
                      audioElement.current.pause();
                      audioElement.current.setAttribute('src', '');
                      audioElement.current = new Audio(textURL);

                      const promise = audioElement.current.play().then(data => {
                        if (promise === undefined) {
                          console.error('Play correct text promise undefined');
                        }
                      }).catch(error => console.error('play error ', error));
                    }
                  }).catch(error => console.error('playAudio error', error));
                 }
               } else {
                 console.error('Play correct audio promise undefined');
               }
            }).catch(error => console.error('playAudio error', error));
          }
        });
       } else {
        handleWrongInputAction(event.key);
        speak(event.key, ttsOptions).then(textURL => {
            if (textURL !== '' && audioElement.current) {
              audioElement.current.pause();
              audioElement.current.setAttribute('src', '');
              audioElement.current = new Audio(textURL);
              const p = audioElement.current.play().then(() => {
                if (p !== undefined && wrongAudioElement.current) {
                  wrongAudioElement.current.setAttribute('currentTime', '0');
                  const promise = wrongAudioElement.current.play().catch(error => console.error('playAudio error', error));
                  if (promise === undefined) {
                    console.error('Play wrong audio promise undefined');
                  }
                } else {
                  console.error('Play wrong audio text promise undefined');
                }
              }).catch(error => console.error('playAudio error', error));
          }

        });
      }
    }
  };

  return (
    <div className="task pad-top-60">
      <div className="flex-m flex-wrap-m">
      <React.StrictMode>
        <div className="col-12">
          <h1>Typing in the Dark</h1>
        </div>
        <div className={'col-2 task__value-to-type task__value-to-type' + (correctInput ? '--correct' : '') + (wrongInput ? '--wrong' : '')} aria-live="polite">
          <span>{ task.text.charAt(currentPos) }</span>
        </div>
        <div className="col-10 task__remaining-text">
          { task.text.substr(currentPos + 1, task.text.length) }
        </div>
        <div className="col-12 col-2-m pad-top-30">
          <div
            className="task__input"
            role="application"
            ref={inputElement}
            tabIndex={0}
            onKeyUp={handleKey}>
              <span className={'task__typed-text' + (correctInput ? '--correct' : '') + (wrongInput ? '--wrong' : '')}>
                { task.typedText }
              </span>
          </div>
          <audio id="player" ref={audioElement} src="" autoPlay />
          <audio id="correct" ref={correctAudioElement} src={assetBaseUrl + 'correct.mp3'} preload="true" />
          <audio id="wrong" ref={wrongAudioElement} src={assetBaseUrl + 'wrongsound.wav'} preload="true" />
         </div>
        </React.StrictMode>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
