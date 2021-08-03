import React from 'react';
import { Box } from '@material-ui/core';

function EmptyView({ message }) {
  return (
    <Box color="text.secondary" fontStyle="italic" p={2}>
      {message}
    </Box>
  );
}

export default EmptyView;
