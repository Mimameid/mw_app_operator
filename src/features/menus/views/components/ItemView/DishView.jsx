import React from 'react';
import { useSelector } from 'react-redux';

import { Paper } from '@material-ui/core';
import Dish from 'features/menus/dishes/components/Dish';
import EmptyView from './EmptyView';

function DishView() {
  const activeDishId = useSelector((state) => state.menus.views.itemId);

  return (
    <Paper variant="outlined">
      {activeDishId ? (
        <React.Fragment>
          <Dish dishId={activeDishId} />
        </React.Fragment>
      ) : (
        <EmptyView message="Wählen sie eine Speise aus der Liste aus, um sie anzuzeigen..." />
      )}
    </Paper>
  );
}

export default DishView;
