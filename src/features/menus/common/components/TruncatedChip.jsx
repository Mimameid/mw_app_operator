import React from 'react';

import { Chip, styled } from '@mui/material';

const StyledTruncatedChip = styled(Chip)(({ theme }) => ({
  maxWidth: '260px',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
}));

export default function TruncatedChip({ className, children, ...props }) {
  return <StyledTruncatedChip {...props} />;
}
