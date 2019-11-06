import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../../shared/reducers';
import { RouteComponentProps } from 'react-router-dom';
import { handleCorrectInput, handleWrongInput, completed } from './task.reducer';
import { speak, ITTS } from '../tts/tts';
import { assetBaseUrl } from '../../config/audio';
import { fingerPlacement } from '../../config/utils';
import { Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(8),
      alignItems: 'center'
    },
    typingGrid: {
      lineHeight: '2em',
      fontWeight: 600,
      fontSize: '5em'
    },
    valueToType: {
      textAlign: 'center',
      color: '#ffffff',
      '&:after': {
        content: ' ',
        display: 'block',
        borderBottom: '3px solid white'
      }
    },
    remainingText: {
      letterSpacing: '0.5em',
      color: '#aaaaaa'
    },
    typedText: {
      color: '#ffffff'
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
    }
  })
);

const mapStateToProps = ({ task }: IRootState) => ({
  task: task.entity,
  currentPos: task.currentPos,
  correctInput: task.correctInput,
  wrongInput: task.wrongInput
});

const mapDispatchToProps = {
  handleCorrectInput,
  handleWrongInput,
  completed
};

type IStateProps = ReturnType<typeof mapStateToProps>;
type IDispatchProps = typeof mapDispatchToProps;

export type IProps = IStateProps & IDispatchProps & RouteComponentProps<{ url: string }>;

const Task = props => {
  const classes = useStyles();
  const {
    task,
    currentPos,
    correctInput,
    wrongInput
  } = props;

  const inputElement = useRef<HTMLDivElement | null>(null);
  const audioElement: React.MutableRefObject<HTMLMediaElement | null> = useRef<HTMLMediaElement | null>(null);
  const correctAudioElement: React.MutableRefObject<HTMLMediaElement | null> = useRef<HTMLMediaElement | null>(null);
  const wrongAudioElement: React.MutableRefObject<HTMLMediaElement | null> = useRef<HTMLMediaElement | null>(null);

  // Action declaration to avoid shadowing
  const handleCorrectInputAction = props.handleCorrectInput;
  const handleWrongInputAction = props.handleWrongInput;
  const completedAction = props.completed;

  useEffect(() => {
    if (inputElement && inputElement.current) {
      inputElement.current.focus();
    }
  });

  const handleKey = (event: React.KeyboardEvent): void => {
    if (event.which !== 0 &&
      audioElement.current &&
      correctAudioElement.current &&
      wrongAudioElement.current &&
      !['Control', 'Meta', 'Shift', 'Alt'].some((modifier: string): boolean => event.key === modifier)
    ) {
      audioElement.current.pause();
      audioElement.current.setAttribute('src', '');
      audioElement.current = new Audio();
      correctAudioElement.current.load();
      wrongAudioElement.current.load();

      // Check is correct key is typed or not
      const correctKeyPressed = event.key.toLowerCase() === task.text.charAt(currentPos);

      // TODO: Maybe rename this variable?
      const ttsOptions: ITTS = { rate: 2 };

      if (currentPos + 1 === task.text.length && correctKeyPressed) {
        completedAction(task);
        props.history.push('/summary');
      }

      if (correctKeyPressed) {
        handleCorrectInputAction(event.key).then(() => {
          if (correctAudioElement.current) {
            correctAudioElement.current.setAttribute('currentTime', '0');
            const p = correctAudioElement.current.play().then(() => {
              if (p !== undefined) {
                if (currentPos < task.text.length - 1) {
                  speak(task.text[currentPos + 1], ttsOptions).then(textURL => {
                    if (textURL !== '' && audioElement.current) {
                      audioElement.current.pause();
                      audioElement.current.setAttribute('src', '');
                      audioElement.current = new Audio(textURL);

                      const promise = audioElement.current.play().then(data => {
                      }).catch(error => console.error('play error ', error));
                      if (promise === undefined) {
                        console.error('Play correct text promise undefined');
                      }
                    }
                  }).catch(error => console.error('playAudio error', error));
                 }
               } else {
                 console.error('Play correct audio promise undefined');
               }
            }).catch(error => console.error('playAudio error', error));

            if (p === undefined) {
              console.error('Play correct effect promise undefined');
            }
          }
        });
       } else {
        handleWrongInputAction(event.key);
        wrongAudioElement.current.setAttribute('currentTime', '0');
        const promise = wrongAudioElement.current.play().then(() => {
          const guidance = fingerPlacement(task.text.charAt(currentPos));
          speak(guidance).then(textURL => {
            if (textURL !== '' && audioElement.current) {
              audioElement.current.pause();
              audioElement.current.setAttribute('src', '');
              audioElement.current = new Audio(textURL);
              const p = audioElement.current.play().catch(error => console.error('playAudio error', error));
              if (p === undefined) {
                console.error('Play wrong promise error');
              }
            }
          }).catch(error => console.error('speak error', error));
        }).catch(error => console.error('playAudio wrong effect error', error));

        if (promise === undefined) {
          console.error('Play wrong audio promise undefined');
        }
      }
    }
  };

  return (
    <Grid container justify="center" alignItems="center" spacing={3} className={classes.root}>
      <React.StrictMode>
      <Grid item xs={12}>
        <Typography variant="h1" align="center">Typing in the dark</Typography>
      </Grid>
      <Grid item container xs={12} spacing={2} className={classes.typingGrid}>
        <Grid item xs={2}>
          <Typography
            variant="h2"
            className={classes.valueToType}
            aria-live="polite"
          >
            { task.text.charAt(currentPos) }
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography
            variant="h2"
            className={classes.remainingText}
          >
            { task.text.substr(currentPos + 1, task.text.length) }
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <div
            className={classes.input}
            role="application"
            ref={inputElement}
            tabIndex={0}
            onKeyUp={handleKey}>
              <Typography
                variant="h2"
                className={classes.typedText}
                style={{ color: (correctInput ? '#4add8c' : '' + wrongInput ? '#ff6347' : '') }}
              >
                { task.typedText }
              </Typography>
            </div>
        </Grid>
      </Grid>
      <audio id="player" ref={audioElement} src="" autoPlay />
      <audio id="correct" ref={correctAudioElement} src={assetBaseUrl + 'correct.mp3'} preload="true" />
      <audio id="wrong" ref={wrongAudioElement} src={assetBaseUrl + 'wrongsound.mp3'} preload="true" />
      </React.StrictMode>
    </Grid>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
