import React from 'react';
import { Box } from '@mui/material';

function EmptyView({ children }) {
  return (
    <Box color="text.secondary" fontStyle="italic" p={2}>
      {children}
    </Box>
  );
}

export default EmptyView;
