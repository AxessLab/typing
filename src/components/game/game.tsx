import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    }
  })
);

const Game = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h1">Välkommen till Typing in the dark</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" align="left">I det här spelet kommer du att få göra olika uppdrag med hjälp av tangentbordet.
        Målet är att klara alla uppdrag i spelet och att lära sig att skriva på tangentborde, utan att se det.
        Uppdragen börjar med några få tangenter och blir mer avancerat ju fler uppdrag du har klarat.</Typography>
        <Typography variant="body1" align="left">För att starta spelet tryck på Enter. Det är knappen till höger på tangentbordet
        format som ett upp och nedvänt L.</Typography>
      </Grid>
      <Grid item>
          <Link to="/explore" className="button">Starta</Link>
      </Grid>
    </Grid>
  );
};

export default Game;
