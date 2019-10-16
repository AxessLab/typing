import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../../shared/reducers';
import { Link, RouteComponentProps } from 'react-router-dom';

import { completed, startAnimate, stopAnimate, increaseType, reset } from './explore.reducer';

import ExploreInput from './explore-input';

import { playAudio } from '../audio/audio';

import './explore.scss';

import logo1 from '../../static/images/Fosauri.svg';
import logo2 from '../../static/images/Onzua.svg';


const mapStateToProps = ({ explore }: IRootState) => ({
  explore: explore
});

const mapDispatchToProps = {
  completed,
  increaseType,
  startAnimate,
  stopAnimate,
  reset
};

export const KEYROWS = {
  ROW_ONE: 'ROW_ONE',
  ROW_ZERO: 'ROW_ZERO',
  ROW_MINUS_ONE: 'ROW_MINUS_ONE'
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export interface IExploreProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

const Explore = (props) => {
  const {
    explore,
    completed,
    increaseType,
    startAnimate,
    stopAnimate,
    reset
  } = props;

  const [timeCount, setTimeCount] = useState(0);
  const timeForExercise = 50;
  const maxInputs = 5;
  const charId = props.match.params.id;

  const audioEl = useRef<HTMLAudioElement>(null);
  const audio: React.MutableRefObject<HTMLMediaElement | null> = useRef(null);

  useEffect(() => {
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

  }, [explore.typeCount, audioEl, timeCount, completed]);

  const getKeyRow = (key : number) => {
    if([81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219].some(test => test === key)) {
      return KEYROWS.ROW_ONE;
    }
    else if([65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222].some(test => test === key)) {
      return KEYROWS.ROW_ZERO
    }
    else if([90, 88, 67, 86, 66, 78, 77, 188, 190].some(test => test === key)) {
      return KEYROWS.ROW_MINUS_ONE
    }
    return null;
  }

  const handleKey = (event: React.KeyboardEvent) => {
    increaseType();
    // Igore modifiers for now
    if (event.which !== 0 && !['Control', 'Meta', 'Shift', 'Alt'].some((modifier: string): boolean => event.key === modifier)) {
        const key = getKeyRow(event.keyCode);
        switch (key) {
          case KEYROWS.ROW_ONE:
              playAudio(audio, '/assets/131142__flameeagle__block.mp3');
            break;
          case KEYROWS.ROW_ZERO:
            playAudio(audio, '/assets/471147__worldmaxter__sword-slide.wav');
            break;
          case KEYROWS.ROW_MINUS_ONE:
            playAudio(audio, '/assets/411462__thebuilder15__bubble-pop.wav');
            break;
        }
        startAnimate();
    }
  }

  const handleReset = () => {
    reset();
    props.history.push('/explore');
  }

  return (
    <>
      <div className="container pad-top-60 text-center">
          {!explore.completed ?
            <>
              <h1>Träna din ninja</h1>
              <p>Tryck på olika knappar på tangentbordet</p>
              <div className="flex-m flex-wrap-m flex-center">
                <div className="col-12 col-3-l pad-top-60">
                  <ExploreInput handleKey={handleKey} handleAnimation={stopAnimate} charId={charId} />
                  <audio id="Player" ref={audio} src="" autoPlay />
                </div>
              </div>
            </>
            :
            <>
              <div className="explore__menu pad-top-10">
                <h1>Redo</h1>
                <p>Bra jobbat! XX har nu fått ett gult bälte i karate och är redo för sitt första uppdrag.</p>
                <div className="flex-m flex-wrap-m flex-center">
                  <div className="col-12 col-3-l">
                    <img
                      src={charId === "1" ? logo1 : logo2}
                      alt={'character figure'}
                    />
                    <ul
                      tabIndex={-1}
                      role="menu">
                        <li role="none">
                          <button role="menuitem" onClick={handleReset} className="button">
                            Öva lite till
                          </button>
                        </li>
                        <li role="none">
                          <Link role="menuitem" to="/" className="button">
                            Gå till nästa övning
                          </Link>
                        </li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          }
        <audio
          ref={audioEl}
          src="/assets/482783__mattiagiovanetti__ninja-tune.wav"
          autoPlay={true}
          loop
        >
          Your browser does not support the audio element.
        </audio>
      </div>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
