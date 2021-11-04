import React from 'react';

import { Box, CircularProgress } from '@mui/material';

function LoadingDataView() {
  return (
    <Box sx={{ position: 'relative', height: '100%' }}>
      <CircularProgress sx={{ position: 'absolute', top: '75px', left: '50%' }} />
    </Box>
  );
}

export default LoadingDataView;
