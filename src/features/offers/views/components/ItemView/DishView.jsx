import React from 'react';
import { useSelector } from 'react-redux';

import Dish from 'features/offers/dishes/components/Dish';
import EmptyView from './EmptyView';

function DishView() {
  const activeDishId = useSelector((state) => state.offers.views.itemId);

  return activeDishId ? (
    <React.Fragment>
      <Dish dishId={activeDishId} />
    </React.Fragment>
  ) : (
    <EmptyView>Wählen Sie eine Speise aus der Liste aus, um sie anzuzeigen...</EmptyView>
  );
}

export default DishView;
