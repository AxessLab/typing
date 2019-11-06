import React, { useRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { speak } from '../tts/tts';
import { playAudio } from '../audio/audio';
import { IRootState } from '../../shared/reducers';
import { setCharacter } from '../../shared/reducers/game-data';
import { Paper, List, ListItem, Typography, Grid } from '@material-ui/core';
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
      textAlign: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0)'
    },
    menuList: {
      '&:focus': {
        outline: 'none'
      }
    },
    menuItem: {
      whiteSpace: 'normal',
      textAlign: 'center',
      outline: 'none',
      '&:focus': {
        border: '2px solid white'
      }
    },
    link: {
      textDecoration: 'none',
      color: '#ffffff'
    },
    image: {
      width: '25%'
    }
  })
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
  const {
    gameCharacters
  } = props;

  const setCharacterAction = props.setCharacter;

  const headerText = 'Välj ninja';
  const introText = 'Tryck pil ned eller upp för att navigera. Välj ninja genom att trycka på enter.';

  const audioElementIntro: React.MutableRefObject<HTMLMediaElement | null> = useRef(null);
  const menuElement = useRef<HTMLUListElement | null>(null);
  const menuElements = [
    useRef<HTMLLIElement | null>(null),
    useRef<HTMLLIElement | null>(null)
  ];
  const [ listIndex, setListIndex ] = useState(-1);

  useEffect(() => {
    if (menuElement && menuElement.current) {
      menuElement.current.focus();
    }
  }, []);

  useEffect(() => {
    speak(headerText + ' ' + introText).then(url => playAudio(audioElementIntro, url));
  }, [headerText, introText]);

  const handleFocus = (id: number) => {
    setListIndex(id);
    speak(gameCharacters[id].name + '.  ' + gameCharacters[id].description).then(url => playAudio(audioElementIntro, url));
  };

  const handleClick = (id: number) => {
    setCharacterAction(id);
  };

  const handleKey = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13) {
      if (listIndex >= 0) {
        handleClick(listIndex);
        props.history.push('/explore/play');
      }
    } else if (event.keyCode === 38 || event.keyCode === 40) {
      if ((listIndex === menuElements.length - 1 || listIndex === -1) && menuElements[0].current) {
        menuElements[0].current.focus();
      } else {
        const element = menuElements[listIndex + 1].current;
        if (element) element.focus();
      }
    }
  };

  return (
    <div className={classes.root}>
      <Grid container alignItems="center" justify="center">
        <Grid item xs={12} sm={12}>
          <Typography variant="h1" align="center" gutterBottom>{headerText}</Typography>
          <Typography variant="body1" align="center">{introText}</Typography>
          <audio id="intro-audio" ref={audioElementIntro} src="" />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Paper className={classes.paper} elevation={0}>
            <List
              ref={menuElement}
              className={classes.menuList}
              onKeyUp={handleKey}
              tabIndex={-1}
            >
              {gameCharacters.map((character, index) => (
                <ListItem
                  key={index}
                  tabIndex={0}
                  className={classes.menuItem}
                  ref={menuElements[index]}
                  onClick={() => handleClick(character.id)}
                  onFocus={() => handleFocus(character.id)}
                >
                  <Link to="/explore/play" className={classes.link} tabIndex={-1}>
                    <img src={character.image} className={classes.image} alt={character.name + ' karaktär'} />
                    <span>
                      <Typography variant="h2">{character.name}</Typography>
                      <Typography variant="body2">{character.description}</Typography>
                    </span>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ExploreMenu);
