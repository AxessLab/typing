import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../../shared/reducers';
import { Link, RouteComponentProps } from 'react-router-dom';
import { speak } from '../tts/tts';
import { completed, startAnimate, stopAnimate, increaseType } from './explore.reducer';
import ExploreInput from './explore-input';
import { playAudio } from '../audio/audio';
import './explore.scss';
import { Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(8),
      alignItems: 'center'
    },
  }),
);

const mapStateToProps = (state: IRootState) => ({
  explore: state.explore,
  currentGameCharacter: state.game.gameCharacter
});

const mapDispatchToProps = {
  completed,
  increaseType,
  startAnimate,
  stopAnimate
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export type IProps = StateProps & DispatchProps & RouteComponentProps<{ url: string }>;

const Explore = props => {
  const classes = useStyles();
  const {
    explore,
    completed,
    increaseType,
    startAnimate,
    stopAnimate,
    currentGameCharacter
  } = props;

  const KEYROWS = {
    ROW_ONE: 'ROW_ONE',
    ROW_ZERO: 'ROW_ZERO',
    ROW_MINUS_ONE: 'ROW_MINUS_ONE'
  };

  const [timeCount, setTimeCount] = useState(0);
  const [headerText, setHeaderText] = useState('Träna din ninja');
  const [introText, setIntroText] = useState('Tryck på olika knappar på tangentbordet');

  const timeForExercise = 60;
  const maxInputs = 50;

  const audioEl = useRef<HTMLAudioElement | null>(null);
  const audio: React.MutableRefObject<HTMLMediaElement | null> = useRef(null);
  const audioElementIntro: React.MutableRefObject<HTMLMediaElement | null> = useRef(null);

  useEffect(() => {
    speak(headerText + ' ' + introText).then(url => playAudio(audioElementIntro, url));
  }, [headerText, introText]);

  useEffect(() => {
    let interval;

    if (timeCount > timeForExercise || explore.typeCount > maxInputs) {
      setHeaderText('Redo');
      setIntroText('Bra jobbat! ' + currentGameCharacter.name + ' har nu fått ett gult bälte i karate och är redo för sitt första uppdrag.');
      completed();
    } else {
      interval = setInterval(() => setTimeCount(0), 1000);
    }

    return () => clearInterval(interval);

  }, [explore.typeCount, timeCount, completed, currentGameCharacter]);

  useEffect(() => {
    if (audioEl && audioEl.current) {
      const isPlaying = !audioEl.current.paused;

      if (!isPlaying) {
        audioEl.current.volume = 0.1;
        const promise = audioEl.current.play();

        if (promise !== undefined) {
          promise.catch(error => console.log("Audio error", error));
        }
      }
    }
  }, [audioEl]);

  const getKeyRow = (key : number) => {
    if ([81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219].some(x => x === key)) {
      return KEYROWS.ROW_ONE;
    }
    else if ([65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222].some(x => x === key)) {
      return KEYROWS.ROW_ZERO;
    }
    else if ([90, 88, 67, 86, 66, 78, 77, 188, 190].some(x => x === key)) {
      return KEYROWS.ROW_MINUS_ONE;
    }
    return null;
  }

  const handleKey = (event: React.KeyboardEvent) => {
    increaseType();

    if (event.which !== 0 && !['Control', 'Meta', 'Shift', 'Alt'].some((modifier: string): boolean => event.key === modifier)) {
      switch (getKeyRow(event.keyCode)) {
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

  return (
    <div className={classes.root}>
      <Grid container alignItems="center" justify="center" spacing={8}>
        <Grid item xs={12}>
          <Typography variant="h1" align="center">{headerText}</Typography>
          <Typography variant="body1" align="center">{introText}</Typography>
          <audio id="intro-audio" ref={audioElementIntro} src="" />
        </Grid>
        <Grid item xs={12} lg={3}>
          {!explore.completed ?
            <>
              <ExploreInput handleKey={handleKey} handleAnimation={stopAnimate} />
              <audio id="player" ref={audio} src="" autoPlay />
            </>
            :
            <>
              <img
              src={currentGameCharacter.image}
              alt={currentGameCharacter.name}
              />
              <Link to="/task" className="button">
                Gå till nästa övning
              </Link>
            </>
          }
        </Grid>
        <audio
          ref={audioEl}
          src="/assets/482783__mattiagiovanetti__ninja-tune.wav"
          autoPlay={true}
          loop
        >
          Your browser does not support the audio element.
        </audio>
      </Grid>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
