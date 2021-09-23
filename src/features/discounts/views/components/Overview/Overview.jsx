import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDiscountGroup } from '../../slice';

import { Paper, Box, Tabs, makeStyles } from '@material-ui/core';
import GroupTab from './GroupTab';
import DiscountOverview from './DiscountOverview/DiscountOverview';
// import CategoryOverview from './CouponOverview/CategoryOverview';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    overflow: 'hidden',
  },
  tabs: {
    borderRadius: '16px 16px 0 0',
    boxShadow: theme.shadows[20],
  },
  listContainer: {
    height: '264px',
    overflow: 'auto',

    boxShadow: theme.shadows[3],
  },
}));

const tabNames = ['Rabatte', 'Gutscheine'];
function Overview() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const group = useSelector((state) => state.discounts.views.group);

  const [value, setValue] = useState(group);

  const handleChange = (event, newValue) => {
    dispatch(selectDiscountGroup(newValue));
    setValue(newValue);
  };

  const renderList = (value) => {
    switch (value) {
      case 0:
        return <DiscountOverview />;
      // case 1:
      //   return <CategoryOverview />;
      default:
        return null;
    }
  };

  return (
    <Paper className={classes.container}>
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
