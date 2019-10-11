import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../../shared/reducers';
import { Link, RouteComponentProps } from 'react-router-dom';

import { completed, startAnimate, stopAnimate, increaseType, reset } from './explore.reducer';
import { playAudio } from '../audio/audio.reducer';


import AudioManager from '../audio/audio';
import ExploreInput from './explore-input';

import './explore.scss';
import audio from '../audio/audio';

const mapStateToProps = ({ explore }: IRootState) => ({
  explore: explore
});

const mapDispatchToProps = {
  completed,
  playAudio,
  increaseType,
  startAnimate,
  stopAnimate,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export interface IExploreProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

const Explore = (props) => {
  const {
    explore,
    playAudio,
    completed, 
    increaseType,
    startAnimate,
    stopAnimate,
    match,
    reset
  } = props;

  const [startExplore, setStartExplore] = useState(false);
  const [timeCount, setTimeCount] = useState(0);
  const timeForExercise = 50;
  const maxInputs = 5;


  const audioEl = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if(!startExplore) {
      return;
    }

    let interval = null;

    if(audioEl && audio) {
      const isPlaying = !audioEl.current.paused;

      if(!isPlaying) {
        audioEl.current.volume = 0.1;
        const promise = audioEl.current.play();
  
        if (promise !== undefined) {
          promise.catch(error => console.log("Audio error", error));
        }
      }
    }

    if(timeCount > timeForExercise || explore.typeCount > maxInputs) {
      completed();
    }
    else {
      interval = setInterval(() => {
        setTimeCount(0);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  
  }, [startExplore, explore.typeCount, audioEl, timeCount, completed]);

  const handleKey = (event: React.KeyboardEvent) => {
    increaseType();
    // Igore modifiers for now
    if (event.which !== 0 && !['Control', 'Meta', 'Shift', 'Alt'].some((modifier: string): boolean => event.key === modifier)) {
        if (event.keyCode > 65 && event.keyCode < 90) {
          startAnimate();
          playAudio(['/assets/30248__streety__sword7.flac']);
        }
    }
  }
  
  const resetExplore = () => {
    setTimeCount(0);
    reset();
  }

  const onStartExplore = (event) => {
    setStartExplore(true);
  }

  return (
    <>
      <div className="container pad-top-60 text-center">
        <h1>Träna din ninja</h1>
        {!startExplore ? 
          <button onClick={onStartExplore} className="button">Starta</button> 
          : 
          <>
            <p>Tryck på olika knappar på tangentbordet</p>
            <div className="flex-m flex-wrap-m flex-center-m pad-top-60">
              <div className="col-4 pad-top-30">
              {!explore.completed ?
                <>
                  <ExploreInput handleKey={handleKey} handleAnimation={stopAnimate} />
                  <AudioManager />
                </>
                :
                <>
                  <button onClick={resetExplore} className="button">Öva lite till</button>
                  <Link to={`${match.url}task`} className="button">Gå till nästa övning</Link>
                </>
              }
              </div>
            </div>
          <audio
            ref={audioEl}
            src="/assets/482783__mattiagiovanetti__ninja-tune.wav"
            autoPlay={true}
            loop>
            Your browser does not support the audio element.
          </audio>
        </>
      }
      </div> 
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
