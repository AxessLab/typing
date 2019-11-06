import React, { useState, useEffect, useRef } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { RouteComponentProps } from 'react-router-dom';
import { speak } from '../tts/tts';
import { playAudio } from '../audio/audio';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(10),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    }
  })
);

export interface IOwnProps {
  startTime: number;
  to: string;
}

export type IProps = IOwnProps & RouteComponentProps<{ url: string }>;

const TaskCountDown = (props: IProps) => {
  const classes = useStyles();
  const { startTime, to } = props;
  const [ timeLeft, setTimeLeft ] = useState(startTime);
  const audioElement: React.MutableRefObject<HTMLMediaElement | null> = useRef(null);

  useEffect(() => {
    if (!timeLeft) {
      // todo: Replace this with hooks https://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router
      props.history.push(to);
    }

    // save intervalId to clear the interval when the component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
  }, [timeLeft, to, props.history]);

  useEffect(() => {
    // todo: Fix to start counting at starttime and not starttime - 1
    speak(timeLeft + ' ').then(url => playAudio(audioElement, url));
  }, [timeLeft]);

  return (
    <Grid container className={classes.root}>
      <Typography variant="h2">{ timeLeft }</Typography>
      <audio ref={audioElement} src="" />
    </Grid>
  );
};

export default TaskCountDown;
