import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { RouteComponentProps } from 'react-router-dom';
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

  useEffect(() => {
    if (!timeLeft) {
      props.history.push(to);
    }

    // save intervalId to clear the interval when the component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
  }, [timeLeft, to, props.history]);

  return (
    <Grid container className={classes.root}>
      <Typography variant="h2">{ timeLeft }</Typography>
    </Grid>
  );
};

export default TaskCountDown;
