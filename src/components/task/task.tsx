import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../../shared/reducers';
import { RouteComponentProps } from 'react-router-dom';

import { getTask, handleCorrectInput, handleWrongInput, completed } from './task.reducer';

import { playAudio } from '../audio/audio.reducer';

import TaskInput from './task-input';
import AudioManager from '../audio/audio';

import './task.scss';
import audio from '../audio/audio';

export interface ITaskProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

const Task = (props) => {
  const {
    currentPos,
    task,
    handleCorrectInput,
    handleWrongInput,
    completed,
    taskDone,
    playAudio  } = props;

  const handleKey = (event: React.KeyboardEvent) => {
    // Igore modifiers for now
    if (event.which !== 0 && !['Control', 'Meta', 'Shift', 'Alt'].some((modifier: string): boolean => event.key === modifier)) {
      
      // Check is correct key is typed or not
      const correctKeyPressed = event.key.toLowerCase() === task.text.charAt(currentPos);

      if (correctKeyPressed) {
        handleCorrectInput();
        playAudio(
          ['http://webbkonversation.se:59125/process?INPUT_TYPE=TEXT&OUTPUT_TYPE=AUDIO&INPUT_TEXT='+event.key+'%0A&OUTPUT_TEXT=&VOICE_SELECTIONS=stts_sv_nst-hsmm%20sv%20male%20hmm&AUDIO_OUT=WAVE_FILE&LOCALE=sv&VOICE=stts_sv_nst-hsmm&AUDIO=WAVE_FILE',
            '/assets/correct.mp3'
          ]
        );
      } else {
        handleWrongInput();
        playAudio(
          ['http://webbkonversation.se:59125/process?INPUT_TYPE=TEXT&OUTPUT_TYPE=AUDIO&INPUT_TEXT='+event.key+'%0A&OUTPUT_TEXT=&VOICE_SELECTIONS=stts_sv_nst-hsmm%20sv%20male%20hmm&AUDIO_OUT=WAVE_FILE&LOCALE=sv&VOICE=stts_sv_nst-hsmm&AUDIO=WAVE_FILE',
            '/assets/wrongsound.wav'
          ]
        );
      }
      
      if (currentPos+1 === task.text.length && correctKeyPressed) {
        task.completed = !task.completed;
        completed(task);
        props.history.push('/summary');
      }
    }
  }

  return (
    <>
      <div className="row flex-center pad-top-60-m pad-top-30">
        <div className="type-here col-4-6">
          <h2>Typing in the Dark</h2>
          <TaskInput handleKey={handleKey} />
          <AudioManager />
        </div>
      </div>
    </>
  );
}

const mapStateToProps = ({ task }: IRootState) => ({
  task: task.entity,
  currentPos: task.currentPos,
  taskDone: task.taskDone
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Task);