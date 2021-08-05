import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
  },
}));

function ContentHeader({ name, info }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h4">{name}</Typography>
      <Typography variant="body1">{info}</Typography>
    </div>
  );
}

export default ContentHeader;