import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import whiteImage from '../../static/images/vita_illustrationer.svg';
import InstructionLayout from '../layout/InstructionLayout';
import { useTranslation } from 'react-i18next';
import { IRootState } from '../../shared/reducers';
import { connect } from 'react-redux';

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

const mapStateToProps = ({ task, game }: IRootState) => ({
  task: task.entity,
  currentGameCharacter: game.gameCharacter
});

type StateProps = ReturnType<typeof mapStateToProps>;

export type ITaskInstructionsProps = StateProps;

const TaskInstruction = (props: ITaskInstructionsProps) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const {
    currentGameCharacter,
    task
  } = props;

  return (task && (
    <Grid container className={classes.root} spacing={8}>
      <InstructionLayout
        title={
          t(`tasks.instructions`)
        }
        to="/task/prestart"
        instructionToSpeak={
          t(`tasks.${task.id}.instructions.p1a`) +
          currentGameCharacter.name +
          t(`tasks.${task.id}.instructions.p1b`) +
          t(`tasks.${task.id}.instructions.p2`) +
          t(`tasks.${task.id}.instructions.p3`)
        }
      >
        <Grid item xs={12} md={7}>
          <Typography variant="body1" align="left">
            {t(`tasks.${task.id}.instructions.p1a`) + currentGameCharacter.name + t(`tasks.${task.id}.instructions.p1b`)}
          </Typography>
        </Grid>
        <Grid item xs={12} md={7}>
          <Typography variant="body1" align="left">
            {t(`tasks.${task.id}.instructions.p2`)}
          </Typography>
        </Grid>
        <Grid item xs={12} md={7}>
          <Typography variant="body1" align="left">
            {t(`tasks.${task.id}.instructions.p3`)}
          </Typography>
        </Grid>
      </InstructionLayout>
      <Grid item container justify="center">
        {task && task.keys.length > 0 && (
          task.keys.map((key, index) => (
            <Grid key={`exercise-${index}`} item xs={12} md={1}>
              <img src={key.image} alt={key.alt} />
            </Grid>
          ))
        )}
        <img
          src={whiteImage}
          alt="Vita illustrationer"
          className={classes.illustration}
        />
      </Grid >
    </Grid>
  )
  );
};

export default connect(mapStateToProps, null)(TaskInstruction);
