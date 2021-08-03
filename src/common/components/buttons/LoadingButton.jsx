import React from 'react';
import { Button, CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  circularProgress: {
    marginLeft: theme.spacing(2),
  },
}));

function LoadingButton({ loading, loadingText, ...props }) {
  const classes = useStyles();
  return (
    <Button {...props} disabled={loading}>
      {!loading ? (
        props.children
      ) : loadingText ? (
        loadingText
      ) : (
        <CircularProgress className={classes.circularProgress} size={20} />
      )}
    </Button>
  );
}

export default LoadingButton;
