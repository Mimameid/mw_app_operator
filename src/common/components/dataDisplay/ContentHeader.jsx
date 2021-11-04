import React from 'react';
import { Box, Typography } from '@mui/material';

function ContentHeader({ name, info }) {
  return (
    <Box sx={{ pt: 6, pb: 6 }}>
      <Typography variant="h4">{name}</Typography>
      <Typography variant="body1">{info}</Typography>
    </Box>
  );
}

export default ContentHeader;
