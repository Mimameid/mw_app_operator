import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectGroup } from '../../viewsSlice';

import { Paper, Box, Tabs, makeStyles } from '@material-ui/core';
import GroupTab from './GroupTab';
import MenuOverview from './MenuOverview/MenuOverview';
import CategoryOverview from './CategoryOverview/CategoryOverview';
import DishOverview from './DishOverview/DishOverview';
import ChoiceOverview from './ChoiceOverview/ChoiceOverview';
import SubOverview from './SubOverview/SubOverview';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
  },
  tabs: {
    borderRadius: '6px 6px 0 0',
    boxShadow: theme.shadows[20],
  },
  tab: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,

    borderRadius: '6px 6px 0 0',
    boxShadow: theme.shadows[12],
  },
  listContainer: {
    height: '264px',
    overflow: 'auto',

    boxShadow: theme.shadows[3],
  },
  fab: {
    position: 'absolute',
    bottom: '12px',
    right: '14px',

    zIndex: 10,
  },
}));

const tabNames = ['Menüs', 'Kategorien', 'Speisen', 'Optiongruppe', 'Optionen'];
function Overview() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    dispatch(selectGroup(newValue));
    setValue(newValue);
  };

  const renderList = (value) => {
    switch (value) {
      case 0:
        return <MenuOverview />;
      case 1:
        return <CategoryOverview />;
      case 2:
        return <DishOverview />;
      case 3:
        return <ChoiceOverview />;
      case 4:
        return <SubOverview />;
      default:
        return null;
    }
  };

  return (
    <Paper className={classes.container} elevation={0}>
      <Tabs
        className={classes.tabs}
        indicatorColor="primary"
        TabIndicatorProps={{
          style: {
            display: 'none',
          },
        }}
        value={value}
        onChange={handleChange}
        aria-label="menu tabs"
        variant="fullWidth"
      >
        {tabNames.map((tabName, index) => (
          <GroupTab key={index} selected={index === value} value={index} label={tabName} />
        ))}
      </Tabs>
      <Box className={classes.listContainer}>{renderList(value)}</Box>
    </Paper>
  );
}

export default Overview;
