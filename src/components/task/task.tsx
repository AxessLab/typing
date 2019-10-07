import React from 'react';
import { connect } from 'react-redux';
import { IRootState, ITTSPlattform } from '../../shared/reducers';
import { RouteComponentProps } from 'react-router-dom';

import { getTask, handleCorrectInput, handleWrongInput, completed } from './task.reducer';

import { playAudio } from '../audio/audio.reducer';

import TaskInput from './task-input';
import AudioManager, { speak, TTS_PLATTFORM } from '../audio/audio';

import './task.scss';

const mapStateToProps = ({ task }: IRootState) => ({
  task: task.entity,
  currentPos: task.currentPos,
  correctInput: task.correctInput,
  wrongInput: task.wrongInput
});

const mapDispatchToProps = {
  getTask,
  handleCorrectInput,
  handleWrongInput,
  completed,
  playAudio,
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
    completed,
    playAudio  } = props;

    
  
  const handleKey = (event: React.KeyboardEvent) => {
    // Igore modifiers for now
    if (event.which !== 0 && !['Control', 'Meta', 'Shift', 'Alt'].some((modifier: string): boolean => event.key === modifier)) {

      // Check is correct key is typed or not
      const correctKeyPressed = event.key.toLowerCase() === task.text.charAt(currentPos);

      //select voice
      const textToSpeak: ITTSPlattform = { 
        type: TTS_PLATTFORM.GOOGLE, 
        lang: 'sv-SE',
        text: event.key,
      };

      if (correctKeyPressed) {
        handleCorrectInput(event.key);
        speak(textToSpeak).then( data => { 
          if(data) {
            playAudio([data, '/assets/correct.mp3']);
          }
          else {
            playAudio(['/assets/correct.mp3']);
          }
        });
      } else {
        handleWrongInput(event.key);
        speak(textToSpeak).then( data => { 
          if(data) {
             playAudio([data, '/assets/wrongsound.wav']);
          }
          else {  
            playAudio(['/assets/wrongsound.wav']);
          }
        });
      }

      if (currentPos + 1 === task.text.length && correctKeyPressed) {
        completed(task);
        props.history.push('/summary');
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
            <AudioManager />
          </div>
        </div>
      </div>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Task);
