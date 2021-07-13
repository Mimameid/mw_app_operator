import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  wrap: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '&:hover': {
      overflow: 'visible',
      whiteSpace: 'normal',
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
