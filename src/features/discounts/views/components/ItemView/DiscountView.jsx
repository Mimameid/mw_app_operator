import React from 'react';
import { useSelector } from 'react-redux';

import Discount from 'features/discounts/discounts/components/Discount';
import EmptyView from './EmptyView';

function DiscountView() {
  const activeDiscountId = useSelector((state) => state.discounts.views.itemId);
  return activeDiscountId ? (
    <React.Fragment>
      <Discount />
    </React.Fragment>
  ) : (
    <EmptyView>Wählen Sie eine Rabattaktion aus der Liste aus, um sie anzuzeigen...</EmptyView>
  );
}

export default DiscountView;
