import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../../shared/reducers';
import { RouteComponentProps } from 'react-router-dom';

import { completed, startAnimate, stopAnimate } from './explore.reducer';
import { playAudio } from '../audio/audio.reducer';


import AudioManager from '../audio/audio';
import ExploreInput from './explore-input';

import './explore.scss';

const mapStateToProps = ({ explore }: IRootState) => ({
  explore: explore
});

const mapDispatchToProps = {
  completed,
  playAudio,
  startAnimate,
  stopAnimate
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export interface IExploreProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

const Explore = (props) => {
  const {
    playAudio,
    completed, 
    startAnimate,
    stopAnimate
  } = props;

  const [seconds, setSeconds] = useState(0);
  const [correctInputs, setCorrectInputs] = useState(0);
  const timeForExercise = 50;
  const maxInputs = 5;


  useEffect(() => {
    let interval = null;
    console.log(seconds, correctInputs);
    if(seconds > timeForExercise || correctInputs > maxInputs) {
      completed();
      props.history.push('/task');
    }
    else {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  
  }, [seconds, correctInputs, completed, props.history]);

  const handleKey = (event: React.KeyboardEvent) => {
    setCorrectInputs(correctInputs => correctInputs + 1);
    // Igore modifiers for now
    if (event.which !== 0 && !['Control', 'Meta', 'Shift', 'Alt'].some((modifier: string): boolean => event.key === modifier)) {
        if (event.keyCode > 65 && event.keyCode < 90) {
          startAnimate();
          playAudio(['/assets/30248__streety__sword7.flac']);
        }
    }
  }

  const handleAnimation = () => {
    stopAnimate();
  }

  return (
    <>
      <div className="container pad-top-60">
        <div className="flex-m flex-wrap-m flex-center">
          <div className="col-12">
            <h1>Träna din ninja</h1>
            <p>Tryck på olika knappar på tangentbordet</p>
          </div>
          <div className="col-12 col-2-m pad-top-30">
            <ExploreInput handleKey={handleKey} handleAnimation={handleAnimation} />
            <AudioManager />
          </div>
        </div>
      </div>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
