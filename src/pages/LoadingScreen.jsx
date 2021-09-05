import React from 'react';

import { Box, CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  loadingContainer: {
    position: 'relative',
    height: '100vh',
    width: '100vw',
  },
  loadingIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
}));

function LoadingScreen() {
  const classes = useStyles();

  return (
    <Box className={classes.loadingContainer}>
      <CircularProgress className={classes.loadingIcon} />
    </Box>
  );
}

export default LoadingScreen;
