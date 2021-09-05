import React from 'react';
import { useSelector } from 'react-redux';

import Menu from 'features/menus/menus/components/Menu';
import EmptyView from './EmptyView';

function MenuView() {
  const activeCategoryId = useSelector((state) => state.menus.views.itemId);

  return activeCategoryId ? (
    <React.Fragment>
      <Menu />
    </React.Fragment>
  ) : (
    <EmptyView>Wählen Sie ein Menü aus der Liste aus, um es anzuzeigen...</EmptyView>
  );
}

export default MenuView;
