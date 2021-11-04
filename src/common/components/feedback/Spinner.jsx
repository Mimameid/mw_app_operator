import React from 'react';

import { CircularProgress } from '@mui/material';

function LoadingScreen() {
  return <CircularProgress sx={{ position: 'absolute', top: '120px', left: '50%' }} />;
}

export default LoadingScreen;
