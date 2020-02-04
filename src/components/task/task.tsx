import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../../shared/reducers';
import { RouteComponentProps } from 'react-router-dom';
import { handleCorrectInput, handleWrongInput, completed, reset } from './task.reducer';
import { speak, ITTS } from '../tts/tts';
import { assetBaseUrl } from '../../config/audio';
import { fingerPlacement } from '../../config/utils';
import { Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { playAudio } from '../../components/audio/audio';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(8),
      alignItems: 'center'
    },
    typingGrid: {
      lineHeight: '2em',
      fontWeight: 600,
      fontSize: '5em',
      textTransform: 'uppercase'
    },
    textToType: {
      color: '#ffffff',
      lineHeight: '1.5em',
      fontSize: '1.2em',
      fontWeight: 600
    },
    remainingText: {
      color: '#ffffff',
      fontSize: '1.5em',
      lineHeight: '1.2em',
      fontWeight: 600,
      letterSpacing: '0.5em'
    },
    input: {
      border: '1px solid white',
      width: '100%',
      height: '2em',
      textAlign: 'center',
      '&:focus': {
        boxShadow: '0 0 10px rgba(255, 255, 255, 1)',
        border: '2px solid rgba(255, 255, 255, 1)',
        outline: '0'
      }
    },
    borderBottom: {
      width: '100%',
      height: '2px',
      marginTop: '0.5em',
      background: '#ffffff'
    }
  })
);

const mapStateToProps = ({ task, game }: IRootState) => ({
  task: task.entity,
  currentPos: task.currentPos,
  wrongInput: task.wrongInput,
  currentGameCharacter: game.gameCharacter
});

const mapDispatchToProps = {
  handleCorrectInput,
  handleWrongInput,
  completed,
  reset
};

type IStateProps = ReturnType<typeof mapStateToProps>;
type IDispatchProps = typeof mapDispatchToProps;

export type IProps = IStateProps & IDispatchProps & RouteComponentProps<{ url: string }>;

const Task = props => {
  const classes = useStyles();

  const { t, i18n } = useTranslation();

  const {
    task,
    currentPos,
    wrongInput,
    currentGameCharacter
  } = props;

  const inputElement = useRef<HTMLDivElement | null>(null);
  const audioElement: React.MutableRefObject<HTMLMediaElement | null> = useRef<HTMLMediaElement | null>(null);

  // Action declaration to avoid shadowing
  const handleCorrectInputAction = props.handleCorrectInput;
  const handleWrongInputAction = props.handleWrongInput;
  const completedAction = props.completed;
  const ttsOptions: ITTS = { language: i18n.language, rate: 2 };

  useEffect(() => {
    if (inputElement && inputElement.current) {
      inputElement.current.focus();
    }
  }, [currentPos, task.exercise, ttsOptions]);

  useEffect(() => {
    const ttsOptionsInEffect: ITTS = { language: i18n.language, rate: 2 };
    speak(task.exercise[currentPos].text, ttsOptionsInEffect).then(url =>
      playAudio(audioElement, url).catch(error =>
        console.error('play error intial character ' + error))).catch(error =>
          console.error('speak inital character errror ' + error));
    // Ignore lint warning about currentPos, i18n and audioElement
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKey = (event: React.KeyboardEvent): void => {
    if (event.which !== 0 && audioElement.current) {
      // Check is correct key is typed or not
      const correctKeyPressed = event.key.toLowerCase() === task.exercise[currentPos].text;

      if (currentPos + 1 === task.exercise.length && correctKeyPressed) {

        completedAction(task);
        props.history.push('/summary');
      }

      if (correctKeyPressed) {
        handleCorrectInputAction(event.key);
        playAudio(audioElement, assetBaseUrl + 'correct.mp3').then(() => {
          if (currentPos < task.exercise.length - 1) {
            speak(task.exercise[currentPos + 1].text, ttsOptions).then(textURL => {
              if (textURL !== '' && audioElement.current) {
                playAudio(audioElement, textURL).catch(error => console.error('playAudio error ', error));
              }
            }).catch(error => console.error('speak error', error));
          }
        }).catch(error => console.error('play current error', error));
      } else {
        handleWrongInputAction(event.key);
        playAudio(audioElement, assetBaseUrl + 'wrongsound.mp3').then(() => {
          const ttsOptionsSlow = { language: i18n.language, rate: 1 };
          speak(fingerPlacement(task.exercise[currentPos].text, i18n.language), ttsOptionsSlow).then(textURL => {
            if (textURL !== '' && audioElement.current) {
              playAudio(audioElement, textURL).catch(error => console.error('playAudio error', error));
            }
          }).catch(error => console.error('speak error', error));
        }).catch(error => console.error('play wrong effect error', error));
      }
    }
  }

  return (
    <Grid container justify="center" alignItems="center" spacing={3} className={classes.root}>
      <Grid item xs={12}>
        <Typography variant="h1" align="center">{t('task.mission1Text')}</Typography>
      </Grid>
      {!task.completed ?
        <React.StrictMode>
          <Grid item container xs={12} justify="center" direction="column" alignItems="center" spacing={2} className={classes.typingGrid}>
            <Grid item container justify="center" spacing={2}>
              <Grid item xs={2}>
                <div
                  className={classes.input}
                  role="application"
                  ref={inputElement}
                  tabIndex={0}
                  onKeyUp={handleKey}
                >
                  <Typography
                    variant="h2"
                    className={classes.textToType}
                    style={{ color: (wrongInput ? '#ff6347' : 'inherit') }}
                    aria-live="polite"
                  >
                    {task.exercise.length ? task.exercise[currentPos].text : ''}
                  </Typography>
                </div>
                <div
                  className={classes.borderBottom}
                  style={{ background: wrongInput ? '#ff6347' : '#ffffff' }}
                />
              </Grid>
              <Grid item xs={2}>
                <Typography
                  variant="h2"
                  className={classes.remainingText}
                >
                  {
                    (currentPos + 1 < task.exercise.length ? task.exercise[currentPos + 1].text : '') +
                    (currentPos + 2 < task.exercise.length ? task.exercise[currentPos + 2].text : '')
                  }
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <img src={currentGameCharacter.image} alt={currentGameCharacter.name + ' ' + t('task.character')} />
            </Grid>
          </Grid>
          <audio id="player" ref={audioElement} src="" autoPlay />
        </React.StrictMode>
        :
        <Typography variant="body1">{t('task.missionAlreadyCompleted')}</Typography>
      }
    </Grid>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
