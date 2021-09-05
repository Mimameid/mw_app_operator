import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  wrap: {
    display: 'flex',
    alignItems: 'center',
  },
  inner: {
    overflow: 'hidden',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    maxWidth: '480px',

    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    wordBreak: 'break-all',
    '&:hover': {
      whiteSpace: 'normal',
      overflow: 'visible',
    },
  },
}));

function TruncatedGridItem(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid className={classes.wrap} {...props}>
        <span className={classes.inner}>{props.children}</span>
      </Grid>
    </React.Fragment>
  );
}

export default TruncatedGridItem;
