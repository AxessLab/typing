import './task.scss';

import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../../shared/reducers';
import { RouteComponentProps } from 'react-router-dom';

import { handleCorrectInput, handleWrongInput, completed } from './task.reducer';

import { getTtsUrl } from '../../config/services';
import { playAudio } from '../audio/audio.reducer';
import AudioManager from '../audio/audio';

const mapStateToProps = ({ task }: IRootState) => ({
  task: task.entity,
  currentPos: task.currentPos,
  correctInput: task.correctInput,
  wrongInput: task.wrongInput,
});

const mapDispatchToProps = {
  handleCorrectInput,
  handleWrongInput,
  playAudio,
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
    playAudio, completed, history
  } = props;

  const inputElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputElement && inputElement.current) {
      inputElement.current.focus();
    }
  })

  const handleKey = (event: React.KeyboardEvent): void => {
    if (event.which !== 0 && !['Control', 'Meta', 'Shift', 'Alt'].some((modifier: string): boolean => event.key === modifier)) {

      // Check is correct key is typed or not
      const correctKeyPressed = event.key.toLowerCase() === task.text.charAt(currentPos);

      if (correctKeyPressed) {
        handleCorrectInput(event.key);
        playAudio([getTtsUrl(event.key), '/assets/correct.mp3']);
      } else {
        handleWrongInput(event.key);
        playAudio([getTtsUrl(event.key), '/assets/wrongsound.wav']);
      }

      if (currentPos + 1 === task.text.length && correctKeyPressed) {
        completed(task);
        history.push('/summary');
      }
    }
  }

  return (
    <>
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
          tabIndex={0}
          onKeyUp={handleKey}>
            <span className={"task__typed-text" +  (correctInput ? '--correct' : '') + (wrongInput ? '--wrong' : '')}>
              { task.typedText }
            </span>
        </div>
        <AudioManager />
      </div>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Task);
