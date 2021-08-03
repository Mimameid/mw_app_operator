import React from 'react';

import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

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
