import React from 'react';

import { Box, CircularProgress, makeStyles } from '@material-ui/core';

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
