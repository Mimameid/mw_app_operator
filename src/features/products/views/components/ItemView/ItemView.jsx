import React from 'react';
import { useSelector } from 'react-redux';

import { Paper } from '@mui/material';
import MenuView from './MenuView';
import CategoryView from './CategoryView';
import ProductView from './Product';
import ChoiceView from './ChoiceView';
import SubView from './SubView';

function ItemView() {
  const group = useSelector((state) => state.menus.views.group);

  const renderView = (group) => {
    switch (group) {
      case 0:
        return <MenuView />;
      case 1:
        return <CategoryView />;
      case 2:
        return <ProductView />;
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
