import React, { useRef, useEffect } from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { Grid, Typography, Link } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import enterImage from '../../static/images/enter_button.svg';

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
    }
  })
);

const Link1 = React.forwardRef<HTMLAnchorElement, RouterLinkProps>((props, ref) => (
  <RouterLink innerRef={ref} {...props} />
));

export interface IProps {
  children: React.ReactNode;
  title: string;
}

const InstructionLayout = (props: IProps) => {
  const { children, title } = props;
  const classes = useStyles();
  const linkElement = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (linkElement.current) {
      linkElement.current.focus();
    }
  }, []);

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={10}>
        <Typography variant="h1">{title}</Typography>
      </Grid>
      <Grid item container xs={12} justify="center" spacing={2}>
        { children }
      </Grid>
      <Link to="/explore" className={classes.link} ref={linkElement} component={Link1}>
        <img src={enterImage} alt="Enter knapp" />
      </Link>
    </Grid>
  );
};

export default InstructionLayout;
