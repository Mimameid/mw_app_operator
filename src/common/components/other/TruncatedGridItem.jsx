import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  wrap: {
    overflow: 'hidden',
    maxWidth: '480px',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),

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
        {props.children}
      </Grid>
    </React.Fragment>
  );
}

export default TruncatedGridItem;
