import React from 'react';
import { Grid, Typography, InputLabel, Select, MenuItem, FormControl } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import whiteImage from '../../static/images/vita_illustrationer.svg';
import logo from '../../static/images/logo.png';
import { IRootState } from '../../shared/reducers';
import { connect } from 'react-redux';
import InstructionLayout from '../../components/layout/InstructionLayout';
import { reset } from '../task/task.reducer';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    },
    link: {
      outline: '0',
      '&:focus img': {
        borderRadius: 3,
        border: '2px solid white'
      }
    },
    illustration: {
      position: 'absolute',
      right: '7em',
      top: '10em',
      [theme.breakpoints.down('lg')]: {
        position: 'relative',
        top: '0',
        right: '0'
      }
    },
    logo: {
      position: 'absolute',
      top: '1em',
      left: '2em',
      height: '70px',
      [theme.breakpoints.down('md')]: {
        position: 'relative',
        display: 'block',
        top: '0',
        left: '0'
      }
    },
    FormControl: {
      position: "absolute",
      top: '1em',
      right: '2em'
    }
  })
);

const mapStateToProps = ({ game }: IRootState) => ({
  gameCharacters: game.gameCharacters
});

const mapDispatchToProps = {
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type IDispatchProps = typeof mapDispatchToProps;

export type IProps = StateProps & IDispatchProps;

const Home = (props: IProps) => {
  const {
    gameCharacters
  } = props;


  const classes = useStyles();

  const { t, i18n } = useTranslation();

  let langCode = i18n.language;

  const onLanguageSelect = (e) => { e.target.value === 'sv-SE' ? langCode = 'sv-SE' : langCode = 'en-US'; i18n.changeLanguage(langCode); };

  return (
    <Grid container className={classes.root} spacing={2}>
      <img src={logo} alt={t('home.logoAlt')} className={classes.logo} />
      <FormControl className={classes.FormControl}>
        <InputLabel id="label">{t('home.language')}</InputLabel>
        <Select labelId="label" id="selectLanguage" onChange={onLanguageSelect} value={i18n.language}>
          <MenuItem value={"en-US"}>English</MenuItem>
          <MenuItem value={"sv-SE"}>Svenska</MenuItem>
        </Select>
      </FormControl>
      <InstructionLayout title={t('home.header')} to="/explore">
        <Grid item xs={12} sm={8}>
          <Typography variant="body1" align="left">
            {t('home.text1')}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="body1" align="left">
            {t('home.text2')}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="body1" align="left">
            {t('home.text3')}
          </Typography>
        </Grid>
      </InstructionLayout>
      <Grid item container justify="center" >
        <Grid item xs={12} md={3}>
          <img src={gameCharacters[0].image} alt={gameCharacters[0].name} />
        </Grid>
        <Grid item xs={12} md={3}>
          <img src={gameCharacters[1].image} alt={gameCharacters[1].name} />
        </Grid>
      </Grid>
      <img src={whiteImage} alt={t('home.illustrations')} className={classes.illustration} />
    </Grid>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
