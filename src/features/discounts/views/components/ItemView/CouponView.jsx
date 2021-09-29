import React from 'react';
import { useSelector } from 'react-redux';

import Coupon from 'features/discounts/coupons/components/Coupon';
import EmptyView from './EmptyView';

function CouponView() {
  const activeCouponId = useSelector((state) => state.discounts.views.itemId);
  return activeCouponId ? (
    <React.Fragment>
      <Coupon />
    </React.Fragment>
  ) : (
    <EmptyView>Wählen Sie eine Couponaktion aus der Liste aus, um sie anzuzeigen...</EmptyView>
  );
}

export default CouponView;
