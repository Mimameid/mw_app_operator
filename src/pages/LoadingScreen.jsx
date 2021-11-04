import React from 'react';

import { Box, CircularProgress } from '@mui/material';

function LoadingScreen() {
  return (
    <Box sx={{ position: 'relative', height: '100vh', width: '100vw' }}>
      <CircularProgress
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
        }}
      />
    </Box>
  );
}

export default LoadingScreen;
