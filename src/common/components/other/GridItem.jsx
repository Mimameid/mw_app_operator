import React from 'react';
import { Grid, makeStyles, useTheme } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  wrap: {
    display: 'flex',
    alignItems: 'center',
  },
  inner: {
    overflow: 'hidden',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    maxWidth: '480px',

    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    wordBreak: 'break-all',
    '&:hover': {
      position: 'absolute',
      maxWidth: '480px',
      backgroundColor: 'white',
      whiteSpace: 'normal',
      overflow: 'visible',
      boxShadow: theme.shadows[3],
      padding: theme.spacing(1),
      borderRadius: theme.spacing(1),
      zIndex: 1000,
    },
  },
}));

function GridItem(props) {
  const classes = useStyles();
  const theme = useTheme();
  const color =
    props.color === 'success' ? theme.palette.success.main : props.color === 'error' ? theme.palette.error.main : null;
  return (
    <React.Fragment>
      <Grid className={classes.wrap} {...props}>
        <span className={classes.inner} style={{ color, fontStyle: props.fontStyle }}>
          {props.children}
        </span>
      </Grid>
    </React.Fragment>
  );
}

export default GridItem;
