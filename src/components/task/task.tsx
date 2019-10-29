import './task.scss';
import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../../shared/reducers';
import { RouteComponentProps } from 'react-router-dom';
import { handleCorrectInput, handleWrongInput, completed } from './task.reducer';
import { speak, ITTS, TTS_PLATTFORM } from '../tts/tts';

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
  const correctAudioElement: React.MutableRefObject<HTMLMediaElement | null> = useRef(null);
  const wrongAudioElement: React.MutableRefObject<HTMLMediaElement | null> = useRef(null);

  const handleKey = (event: React.KeyboardEvent): void => {
    if (event.which !== 0 && !['Control', 'Meta', 'Shift', 'Alt'].some((modifier: string): boolean => event.key === modifier)) {
      audioElement.current.pause();
      audioElement.current.setAttribute('src','');
      audioElement.current = new Audio();
      correctAudioElement.current.load();
      wrongAudioElement.current.load();

      const startTime = Date.now();

      // Check is correct key is typed or not
      const correctKeyPressed = event.key.toLowerCase() === task.text.charAt(currentPos);
      // Select voices
      // GOOGLE / Mary / WEBSPEECH
      const textToSpeak: ITTS = {
        type: TTS_PLATTFORM.GOOGLE,
        lang: 'sv-SE',
        text: event.key,
        rate: '2.00',
        pitch: '0.00'
      };

      const nextTextToSpeak: ITTS = {
        type: TTS_PLATTFORM.GOOGLE,
        lang: 'sv-SE',
        text: '',
        rate: '2.00',
        pitch: '0.00'
      }

      if (currentPos < task.text.length - 1) {
        nextTextToSpeak.text = task.text[currentPos + 1];
      }

      if (currentPos + 1 === task.text.length && correctKeyPressed) {
        completed(task);
        props.history.push('/summary');
      }

      if (correctKeyPressed) {
        handleCorrectInput(event.key).then(() => {
          correctAudioElement.current.setAttribute('currentTime','0');
          correctAudioElement.current.play().then(() => {
            if (currentPos < task.text.length - 1) {
              speak(nextTextToSpeak).then(textURL => {
                console.log('Speak done: ' + textURL);
                if (textURL !== '') {

                  audioElement.current.pause();
                  audioElement.current.setAttribute('src', '');
                  audioElement.current = new Audio(textURL)

                  audioElement.current.play().then( data => {
                    const endTime = Date.now();
                    const timeDiff = endTime - startTime;
                    console.log(`Correct feedback using ${textToSpeak.type} for character to write and ${nextTextToSpeak.type} for next character took ${timeDiff} ms.`);

                  }).catch(error => console.error('play error ', error));
                }
              }).catch(error => console.error('playAudio error', error));
            }
          }).catch(error => console.error('playAudio error', error));
        });

       } else {
        handleWrongInput(event.key);
        speak(textToSpeak).then(textURL => {
            if (textURL !== '') {
              audioElement.current.pause();
              audioElement.current.setAttribute('src', '');
              audioElement.current = new Audio(textURL);
              audioElement.current.play().then(() => {
                wrongAudioElement.current.setAttribute('currentTime', '0');
                wrongAudioElement.current.play().catch(error => console.error('playAudio error', error));
              }).catch(error => console.error('playAudio error', error));
          }
        });
    }
  }
  }

  return (
    <div className="task pad-top-60">
      <div className="flex-m flex-wrap-m">
      <React.StrictMode>
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
            role="application"
            ref={inputElement}
            tabIndex={0}
            onKeyUp={handleKey}>
              <span className={"task__typed-text" +  (correctInput ? '--correct' : '') + (wrongInput ? '--wrong' : '')}>
                { task.typedText }
              </span>
          </div>
          <audio id="player" ref={audioElement} src="" autoPlay />
          <audio id="correct" ref={correctAudioElement} src="/assets/correct.mp3" preload="true" />
          <audio id="wrong" ref={wrongAudioElement} src="/assets/wrongsound.wav" preload="true" />
         </div>
        </React.StrictMode>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Task);
