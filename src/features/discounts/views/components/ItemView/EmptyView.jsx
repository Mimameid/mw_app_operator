import React from 'react';
import { Box } from '@material-ui/core';

function EmptyView({ children }) {
  return (
    <Box color="text.secondary" fontStyle="italic" p={2}>
      {children}
    </Box>
  );
}

export default EmptyView;
