import React from 'react';
import { Box, Grid, makeStyles } from '@material-ui/core';

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
      position: 'absolute',
      maxWidth: '480px',
      backgroundColor: 'white',
      whiteSpace: 'normal',
      overflow: 'visible',
      boxShadow: theme.shadows[3],
      padding: theme.spacing(1),
      borderRadius: theme.spacing(1),
      zIndex: 1000,
    },
  },
}));

function GridItem(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid className={classes.wrap} {...props}>
        <Box className={classes.inner} color={props.color} fontStyle={props.fontStyle}>
          {props.children}
        </Box>
      </Grid>
    </React.Fragment>
  );
}

export default GridItem;
