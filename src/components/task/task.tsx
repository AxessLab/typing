import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../../shared/reducers';
import { RouteComponentProps } from 'react-router-dom';

import { getTask, handleCorrectInput, handleWrongInput, completed } from './task.reducer';

import { playAudio } from '../audio/audio.reducer';

import TaskInput from './task-input';
import AudioManager from '../audio/audio';

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
  const explore = props.match.params.explore === undefined ? false : true;
  
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

      if(explore) {
        if (event.keyCode > 65 && event.keyCode < 90) playAudio(['/assets/correct.mp3']);
      }
      else {
        if (correctKeyPressed) {
          handleCorrectInput(event.key);
          playAudio(
            ['http://webbkonversation.se:59125/process?INPUT_TYPE=TEXT&OUTPUT_TYPE=AUDIO&INPUT_TEXT='+event.key+'%0A&OUTPUT_TEXT=&VOICE_SELECTIONS=stts_sv_nst-hsmm%20sv%20male%20hmm&AUDIO_OUT=WAVE_FILE&LOCALE=sv&VOICE=stts_sv_nst-hsmm&AUDIO=WAVE_FILE',
              '/assets/correct.mp3'
            ]
          );
        } else {
          handleWrongInput(event.key);
          playAudio(
            ['http://webbkonversation.se:59125/process?INPUT_TYPE=TEXT&OUTPUT_TYPE=AUDIO&INPUT_TEXT='+event.key+'%0A&OUTPUT_TEXT=&VOICE_SELECTIONS=stts_sv_nst-hsmm%20sv%20male%20hmm&AUDIO_OUT=WAVE_FILE&LOCALE=sv&VOICE=stts_sv_nst-hsmm&AUDIO=WAVE_FILE',
              '/assets/wrongsound.wav'
            ]
          );
        }
  
        if (currentPos + 1 === task.text.length && correctKeyPressed) {
          completed(task);
          props.history.push('/summary');
        }
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
          { !explore ? (
              <>
                <div className={"col-2 task__value-to-type task__value-to-type" + (correctInput ? '--correct' : '') + (wrongInput ? '--wrong' : '')} aria-live="polite">
                  <span>
                    {task.text.charAt(currentPos)}
                  </span>
                </div>
                <div className="col-10 task__remaining-text">
                  {task.text.substr(currentPos + 1, task.text.length)}
                </div>
              </>
            ) : ''
          }
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
