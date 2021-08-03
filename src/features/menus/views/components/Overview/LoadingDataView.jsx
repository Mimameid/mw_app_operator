import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  loadingContainer: {
    position: 'relative',
    height: '100%',
  },
  loadingIcon: {
    position: 'absolute',
    top: '75px',
    left: '50%',
  },
}));

function LoadingDataView() {
  const classes = useStyles();

  return (
    <Box className={classes.loadingContainer}>
      <CircularProgress className={classes.loadingIcon} />
    </Box>
  );
}

export default LoadingDataView;
