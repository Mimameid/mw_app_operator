import React from 'react';

import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '260px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
}));

export default function TruncatedBox({ className, children, ...props }) {
  const classes = useStyles();

  return (
    <Box className={`${classes.root} ${className}`} {...props}>
      {children}
    </Box>
  );
}
