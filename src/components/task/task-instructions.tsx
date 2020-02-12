import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import whiteImage from '../../static/images/vita_illustrationer.svg';
import InstructionLayout from '../layout/InstructionLayout';
import { connect } from 'react-redux';
import { IRootState } from '../../shared/reducers';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
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
    }
  })
);
const localData = localStorage.getItem('i18nextLng')

const mapStateToProps = ({ game, task }: IRootState) => ({
  currentGameCharacter: game.gameCharacter,
  currentTaskInstruction: task.entity.instructions,
  currentTask: task.currentTask
});

type StateProps = ReturnType<typeof mapStateToProps>;

export type IProps = StateProps;

const TaskInstruction = (props: IProps) => {
  const classes = useStyles();
  const { currentGameCharacter, currentTaskInstruction, currentTask } = props;

  let paragraphs;
  if (localData === 'sv-SE') {
    paragraphs = [
      currentTaskInstruction.missionText,
      currentTaskInstruction.p1a + currentGameCharacter.name + currentTaskInstruction.p1b,
      currentTaskInstruction.p2,
      currentTaskInstruction.p3
    ];
  } else {
    paragraphs = [
      currentTaskInstruction.missionTextEn,
      currentTaskInstruction.p1aEn + currentGameCharacter.name + currentTaskInstruction.p1bEn,
      currentTaskInstruction.p2En,
      currentTaskInstruction.p3En

    ];
  }

  return (
    <Grid container className={classes.root} spacing={8}>
      <InstructionLayout title={paragraphs[0]} to="/task/prestart" instructionToSpeak={paragraphs.join(' ')}>
        <Grid item xs={12} md={7}>
          <Typography variant="body1" align="left">
            {paragraphs[1]}
          </Typography>
        </Grid>
        <Grid item xs={12} md={7}>
          <Typography variant="body1" align="left">
            {paragraphs[2]}
          </Typography>
        </Grid>
        <Grid item xs={12} md={7}>
          <Typography variant="body1" align="left">
            {paragraphs[3]}
          </Typography>
        </Grid>
      </InstructionLayout>
      {(currentTask === 0 || currentTask === 3) ?
        <>
          <Grid item container justify="center">
            <Grid item xs={12} md={2}>
              <img src={currentTaskInstruction.img1} alt={currentTaskInstruction.alt1} />
            </Grid>
            <Grid item xs={12} md={2}>
              <img src={currentTaskInstruction.img2} alt={currentTaskInstruction.alt2} />
            </Grid>
          </Grid>
          <img src={whiteImage} alt="Vita illustrationer" className={classes.illustration} />
        </>
        :
        <>
          <Grid item container justify="center">
            <Grid item xs={12} md={1}>
              <img src={currentTaskInstruction.img1} alt={currentTaskInstruction.alt1} />
            </Grid>
            <Grid item xs={12} md={1}>
              <img src={currentTaskInstruction.img2} alt={currentTaskInstruction.alt2} />
            </Grid>
            <Grid item xs={12} md={1}>
              <img src={currentTaskInstruction.img3} alt={currentTaskInstruction.alt3} />
            </Grid>
            <Grid item xs={12} md={1}>
              <img src={currentTaskInstruction.img4} alt={currentTaskInstruction.alt4} />
            </Grid>
            <Grid item xs={12} md={1}>
              <img src={currentTaskInstruction.img5} alt={currentTaskInstruction.alt5} />
            </Grid>
            <Grid item xs={12} md={1}>
              <img src={currentTaskInstruction.img6} alt={currentTaskInstruction.alt6} />
            </Grid>

          </Grid>
          <img
            src={whiteImage}
            alt='Vita illustrationer'
            className={classes.illustration}
          />
        </>
      }
    </Grid >

  );
};

export default connect(mapStateToProps)(TaskInstruction);
