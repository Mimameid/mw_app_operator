import React from 'react';

import { CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  loadingIcon: {
    position: 'absolute',
    top: '120px',
    left: '50%',
  },
}));

function LoadingScreen() {
  const classes = useStyles();

  return <CircularProgress className={classes.loadingIcon} />;
}

export default LoadingScreen;
