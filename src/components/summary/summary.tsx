import React, { useRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../../shared/reducers';
import { playAudio } from '../audio/audio';
import { speak } from '../tts/tts';
import { assetBaseUrl } from '../../config/audio';
import { Typography, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(8),
      alignItems: 'center'
    }
  })
);

const mapStateToProps = ({ task }: IRootState) => ({
  taskErrors: task.errors
});

type StateProps = ReturnType<typeof mapStateToProps>;

type ISummmaryProps = StateProps;

const Summmary = ({ taskErrors }: ISummmaryProps) => {
  const classes = useStyles(mapStateToProps);
  const [feedbackText, setFeedbackText] = useState('');
  const audioElement: React.MutableRefObject<HTMLMediaElement | null> = useRef(null);

  useEffect(() => {
    // TODO: useEffect runs twice, for some reason...
    if (taskErrors > 0) {
      speak(`Resultat. Bra jobbat! Du hade bara ${taskErrors} fel.`).then(url => {
        playAudio(audioElement, url).then(() => {
          playAudio(audioElement, assetBaseUrl + 'done.mp3')
            .catch(error => console.error('playAudio error', error));
        }).catch(error => console.error('playAudio error', error));
      }).catch(error => console.error('speak error', error));

      setFeedbackText(`Bra Jobbat! Du hade bara ${taskErrors} fel!`);
    } else {
      speak('Resultat. Jättebra jobbat! Felfri.').then(url => {
        playAudio(audioElement, url).then(() => {
          playAudio(audioElement, assetBaseUrl + 'done.mp3')
            .catch(error => console.error('playAudio error', error));
        }).catch(error => console.error('playAudio error', error));
      }).catch(error => console.error('speak error', error));

      setFeedbackText('Jättebra jobbat! Felfri!');
    }
  }, [feedbackText, taskErrors]);

  return (
    <Grid container justify="center" alignItems="center" className={classes.root}>
      <Grid item xs={12}>
        <Typography variant="h2">Resultat</Typography>
        <Typography variant="body1">{feedbackText}</Typography>
        <audio id="player" ref={audioElement} src="" autoPlay />
      </Grid>
    </Grid>
  );
};

export default connect(mapStateToProps)(Summmary);
