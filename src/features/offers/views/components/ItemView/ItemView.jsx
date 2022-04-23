import React from 'react';
import { useSelector } from 'react-redux';

import { Paper } from '@mui/material';
import OfferView from './OfferView';
import CategoryView from './CategoryView';
import DishView from './DishView';
import ChoiceView from './ChoiceView';
import SubView from './SubView';

function ItemView() {
  const group = useSelector((state) => state.offers.views.group);

  const renderView = (group) => {
    switch (group) {
      case 0:
        return <OfferView />;
      case 1:
        return <CategoryView />;
      case 2:
        return <DishView />;
      case 3:
        return <ChoiceView />;
      case 4:
        return <SubView />;
      default:
        return null;
    }
  };

  return (
    <Paper style={{ overflow: 'hidden' }} elevation={2}>
      {renderView(group)}
    </Paper>
  );
}

export default ItemView;
