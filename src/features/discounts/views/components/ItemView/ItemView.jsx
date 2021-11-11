import React from 'react';
import { useSelector } from 'react-redux';

import { Paper } from '@mui/material';
import DiscountView from './DiscountView';
import CouponView from './CouponView';

function ItemView() {
  const group = useSelector((state) => state.discounts.views.group);

  const renderView = (group) => {
    switch (group) {
      case 0:
        return <DiscountView />;
      case 1:
        return <CouponView />;
      default:
        return null;
    }
  };

  return (
    <Paper sx={{ overflow: 'hidden' }} elevation={2}>
      {renderView(group)}
    </Paper>
  );
}

export default ItemView;
