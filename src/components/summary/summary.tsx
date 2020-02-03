import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../../shared/reducers';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps
} from 'react-router-dom';
import { playAudio } from '../audio/audio';
import { speak, ITTS } from '../tts/tts';
import { assetBaseUrl } from '../../config/audio';
import { Typography, Grid, Button } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Task2 from '../newTask/task2';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(8),
      alignItems: 'center'
    },
    alignCenter: {
      textAlign: 'center'
    }
  })
);

const mapStateToProps = ({ game }: IRootState) => ({
  currentGameCharacter: game.gameCharacter
});

type StateProps = ReturnType<typeof mapStateToProps>;

type ISummmaryProps = StateProps;

const Summmary = ({ currentGameCharacter }: ISummmaryProps) => {
  const classes = useStyles();

  const { t, i18n } = useTranslation();

  const audioElement: React.MutableRefObject<HTMLMediaElement | null> = useRef(null);

  const Link1 = React.forwardRef<HTMLAnchorElement, RouterLinkProps>((props, ref) => (
    <RouterLink innerRef={ref} {...props} />
  ));

  const buttonElement = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const ttsOptionsInEffect: ITTS = { language: i18n.language };
    playAudio(audioElement, assetBaseUrl + 'done.mp3').then(() => {
      speak(t('summary.completedText'), ttsOptionsInEffect).then(url => {
        playAudio(audioElement, url).catch(error => console.error('playAudio error', error));
      }).catch(error => console.error('speak error', error));
    }).catch(error => console.error('play audio error', error));
    // ignore lint i18n warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* useEffect(() => {
    buttonElement.current.focus()
  }) */

  return (
    <Grid container justify="center" direction="column" alignItems="center" spacing={2} className={classes.root}>
      <Grid item xs={12} sm={7}>
        <Typography variant="h2">{t('summary.completedHeader')}</Typography>
      </Grid>
      <Grid item xs={12} sm={7}>
        <Typography variant="body1">{t('summary.completedText')}</Typography>
      </Grid>
      <Grid item xs={12} sm={7}>
        <img src={currentGameCharacter.image} alt={currentGameCharacter.name} />
      </Grid>
      <Grid item xs={12} className={classes.alignCenter}>
        <Button variant="outlined" to="/task2" ref={buttonElement} component={Link1}>
          {t('explore.next')}
        </Button>
      </Grid>
      <audio id="player" ref={audioElement} src="" autoPlay />
    </Grid>
  );
};

export default connect(mapStateToProps)(Summmary);
