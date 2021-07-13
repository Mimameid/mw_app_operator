import React from 'react';

import { Box, makeStyles, Tab } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  tab: {
    color: theme.palette.common.white,

    borderRadius: '6px 6px 0 0',
    backgroundColor: theme.palette.primary.main,
    opacity: 1,

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
        className={selected ? classes.tab : null}
        component="div"
        value={value}
        label={<Box>{label}</Box>}
        {...props}
      />
    </React.Fragment>
  );
}

export default GroupTab;
