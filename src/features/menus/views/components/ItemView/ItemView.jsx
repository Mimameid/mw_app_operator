import React from 'react';
import { useSelector } from 'react-redux';

import MenuView from './MenuView';
import CategoryView from './CategoryView';
import DishView from './DishView';
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
        return <DishView />;
      case 3:
        return <ChoiceView />;
      case 4:
        return <SubView />;
      default:
        return null;
    }
  };

  return renderView(group);
}

export default ItemView;
