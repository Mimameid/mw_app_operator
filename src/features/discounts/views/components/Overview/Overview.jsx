import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDiscountGroup } from '../../slice';

import { Paper, Box, Tabs } from '@mui/material';
import GroupTab from 'common/components/dataDisplay/GroupTab';
import DiscountOverview from './DiscountOverview/DiscountOverview';
import CouponOverview from './CouponOverview/CouponOverview';

const tabNames = ['Rabattaktionen', 'Gutscheinaktionen'];
function Overview() {
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
      case 1:
        return <CouponOverview />;
      default:
        return null;
    }
  };

  return (
    <Paper sx={{ position: 'relative', overflow: 'hidden' }} elevation={2}>
      <Tabs
        sx={{ borderRadius: '16px 16px 0 0', boxShadow: (theme) => theme.shadows[20] }}
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
      <Box sx={{ boxShadow: (theme) => theme.shadows[3] }}>{renderList(value)}</Box>
    </Paper>
  );
}

export default Overview;
