import React from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
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

const Home = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h1">Välkommen till Typing in the dark</Typography>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Typography variant="body1" align="left">I det här spelet kommer du att få göra olika uppdrag med hjälp av tangentbordet och
          du spelar med en ninja. Du kommer få olika uppdrag att klara av och efter varje avklarat uppdrag få olika bälten från vit till svart.
          Uppdragen består av allt ifrån att hitta saker i mörka grottor till att göra så många kombos av ninja moves som möjligt.
        </Typography>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Typography variant="body1" align="left">Målet är att klara alla uppdrag i spelet och att lära sig att skriva på tangentbordet,
          utan att se det. När du har klarat alla uppdrag i spelet får du svart bälte i tangentbord.
        </Typography>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Typography variant="body1" align="left">
          För att starta spelet tryck tab och sedan Enter, den knappen ligger till höger på tangentbordet format som ett upp och nedvänt L.
        </Typography>
      </Grid>

      <Grid item>
        <Button variant="outlined" href="/explore">
          Starta
        </Button>
      </Grid>
    </Grid>
  );
};

export default Home;
