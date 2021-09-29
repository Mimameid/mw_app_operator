import React from 'react';

import { Box, Tab, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  tab: {
    // bug fix of material ui tabs responsiveness
    minWidth: '90px',
    padding: '14px 12px',
    zIndex: 100,
  },
  selected: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
    opacity: 1,

    borderRadius: '16px 16px 0 0',
    boxShadow: theme.shadows[12],
  },
  addButton: {
    marginLeft: theme.spacing(1),
    marginBottom: '2px',
    verticalAlign: 'middle',

    color: theme.palette.common.white,
  },
}));

function GroupTab({ selected, label, value, ...props }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Tab
        className={`${classes.tab} ${selected ? classes.selected : null}`}
        value={value}
        label={<Box>{label}</Box>}
        {...props}
      />
    </React.Fragment>
  );
}

export default GroupTab;
