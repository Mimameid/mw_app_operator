import React from 'react';
import { useSelector } from 'react-redux';

import { Paper } from '@material-ui/core';
import DiscountView from './DiscountView';

function ItemView() {
  const group = useSelector((state) => state.discounts.views.group);

  const renderView = (group) => {
    switch (group) {
      case 0:
        return <DiscountView />;
      case 1:
        return null;
      default:
        return null;
    }
  };

  return <Paper style={{ overflow: 'hidden' }}>{renderView(group)}</Paper>;
}

export default ItemView;
