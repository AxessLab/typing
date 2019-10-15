import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../../shared/reducers';
import { RouteComponentProps } from 'react-router-dom';

import { getTask, handleCorrectInput, handleWrongInput, completed, next } from './task.reducer';

import TaskInput from './task-input';
import { playAudioAsync } from '../audioasync/audioasync';

import { speak, ITTS, TTS_PLATTFORM, } from '../tts/tts';

import './task.scss';

const mapStateToProps = ({ task }: IRootState) => ({
  task: task.entity,
  currentPos: task.currentPos,
  correctInput: task.correctInput,
  wrongInput: task.wrongInput,
  });

const mapDispatchToProps = {
  getTask,
  handleCorrectInput,
  handleWrongInput,
  completed,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export interface ITaskProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

const Task = (props) => {
  const {
    currentPos,
    correctInput,
    wrongInput,
    task,
    handleCorrectInput,
    handleWrongInput,
    completed
  } = props;

  const audio: React.MutableRefObject<HTMLMediaElement | null> = useRef(null);
  
  const handleKey = (event: React.KeyboardEvent) => {
    // Igore modifiers for now
    if (event.which !== 0 && !['Control', 'Meta', 'Shift', 'Alt'].some((modifier: string): boolean => event.key === modifier)) {

      // Check is correct key is typed or not
      const correctKeyPressed = event.key.toLowerCase() === task.text.charAt(currentPos);

      //select voices
      //GOOGLE / Mary / WEBSPEECH
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

      if(currentPos < task.text.length-1) {
        nextTextToSpeak.text = task.text[currentPos+1];
      }

      if (currentPos + 1 === task.text.length && correctKeyPressed) {
        completed(task);
        props.history.push('/summary');
      }

      if (correctKeyPressed) {
        handleCorrectInput(event.key);
        let startTime = Date.now();
        ///speak(textToSpeak).then( data => { 
          //playAudioAsync(audio, data).then( data => {
            playAudioAsync(audio, 'assets/correct.mp3').then( data => {
              if(currentPos<task.text.length-1) {
                speak(nextTextToSpeak).then( data => { 
                  playAudioAsync(audio, data).then( data => {
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
              playAudioAsync( audio, data ).then( data => { 
                playAudioAsync(audio, '/assets/wrongsound.wav'); 
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
            <span>
              {task.text.charAt(currentPos)}
            </span>
          </div>
          <div className="col-10 task__remaining-text">
            {task.text.substr(currentPos + 1, task.text.length)}
          </div>
          <div className="col-12 col-2-m pad-top-30">
            <TaskInput handleKey={handleKey} />
            <audio id="Player"
                ref={audio}
                src=""
                autoPlay></audio>
          </div>
        </div>
      </div>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Task);
