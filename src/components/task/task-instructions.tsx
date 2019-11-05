import React, { useRef, useEffect } from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { Grid, Typography, Link } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import whiteImage from '../../static/images/vita_illustrationer.svg';
import { IRootState } from '../../shared/reducers';
import { connect } from 'react-redux';
import InstructionLayout from '../layout/InstructionLayout';

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
    }
  })
);

const Link1 = React.forwardRef<HTMLAnchorElement, RouterLinkProps>((props, ref) => (
  <RouterLink innerRef={ref} {...props} />
));

const mapStateToProps = (state: IRootState) => ({
  gameCharacters: state.game.gameCharacters
});

type StateProps = ReturnType<typeof mapStateToProps>;

export type IProps = StateProps;

const TaskInstruction = (props: IProps) => {
  const linkElement = useRef<HTMLAnchorElement | null>(null);
  const {
    gameCharacters
  } = props;

  useEffect(() => {
    if (linkElement.current) {
      linkElement.current.focus();
    }
  }, []);

  const classes = useStyles();
  return (
    <Grid container className={classes.root}spacing={2}>
      <InstructionLayout title="Uppdrag 1">
        Test
      </InstructionLayout>
      <img src={whiteImage} alt="Vita illustrationer" className={classes.illustration}/>
    </Grid>
  );
};

export default connect(mapStateToProps)(TaskInstruction);
