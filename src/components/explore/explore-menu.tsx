import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { speak } from '../tts/tts';
import { playAudio } from '../audio/audio';
import { IRootState } from 'shared/reducers';
import { setCharacter } from 'shared/reducers/game-data';
import { Paper, MenuItem, MenuList, Typography, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    paper: {
      display: 'flex',
      backgroundColor: 'rgba(255, 255, 255, 0)',
    },
    menuList: {
      '&:focus': {
        outline: 'none'
      }
    },
    menuItem: {
      whiteSpace: 'normal',
      textAlign: 'center',
      '&:focus': {
        border: '2px solid white'
      }
    },
    link: {
      textDecoration: 'none',
      '&:focus' : {
        outline: 'none'
      }
    }
  }),
);

const mapStateToProps = (state: IRootState) => ({
  gameCharacters: state.game.gameCharacters
});

const mapDispatchToProps = {
  setCharacter
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export type IProps = StateProps & DispatchProps & RouteComponentProps<{ url: string }>;

const ExploreMenu = (props: IProps) => {
  const classes = useStyles();
  const { gameCharacters, setCharacter} = props;
  const headerText = 'Välj ninja';
  const introText = 'Tryck tabb för att navigera. Välj genom att trycka på enter.';

  const audioElementIntro: React.MutableRefObject<HTMLMediaElement | null> = useRef(null);

  const menuElement = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if(menuElement && menuElement.current) {
      menuElement.current.focus();
    }
  });

  useEffect(() => {
    speak(headerText + ' ' + introText).then(url => playAudio(audioElementIntro, url));
  }, [headerText, introText]);

  const handleFocus = (e: React.FocusEvent<HTMLLIElement>) => {
    e.preventDefault();
    const id = e.currentTarget.dataset.id ? e.currentTarget.dataset.id : 0;
    speak(gameCharacters[id].name + '.  ' + gameCharacters[id].description).then(url => playAudio(audioElementIntro, url))
  }
  return (
    <div className={classes.root}>
      <Grid container alignItems="center" justify="center">
        <Grid item xs={12} lg={12}>
          <Typography variant="h1" align="center" gutterBottom>{headerText}</Typography>
          <Typography variant="body2" align="center">{introText}</Typography>
          <audio id="intro-audio" ref={audioElementIntro} src="" />
        </Grid>
        <Grid item xs={12} lg={5}>
          <Paper className={classes.paper} elevation={0}>
            <MenuList
              ref={menuElement}
              className={classes.menuList}
              aria-hidden={true}
            >
              {gameCharacters.map((character, index) => (
                <MenuItem
                  key={index}
                  className={classes.menuItem}
                  data-id={character.id}
                  onFocus={handleFocus}
                >
                  <Link className={classes.link} to="/explore/play" onClick={() => setCharacter(index)}>
                    <img src={character.image} className="explore__menu-image" alt="Fosuari character" />
                    <span>
                      <Typography variant="h2">{character.name}</Typography>
                      <Typography variant="body2">{character.description}</Typography>
                    </span>
                  </Link>
                </MenuItem>
              ))}
            </MenuList>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ExploreMenu);
