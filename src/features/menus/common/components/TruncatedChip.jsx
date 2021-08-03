import React from 'react';

import { Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '260px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
}));

export default function TruncatedChip({ className, children, ...props }) {
  const classes = useStyles();

  return <Chip className={`${classes.root} ${className}`} {...props} />;
}
