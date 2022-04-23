import React from 'react';

import { Box, styled } from '@mui/material';

const StyledTruncatedBox = styled(Box)(({ theme }) => ({
  maxWidth: '260px',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
}));

export default function TruncatedBox({ className, children, ...props }) {
  return <StyledTruncatedBox {...props}>{children}</StyledTruncatedBox>;
}
