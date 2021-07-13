import React from 'react';
import { useSelector } from 'react-redux';

import { Paper } from '@material-ui/core';
import Menu from 'features/menus/menus/components/Menu';
import EmptyView from './EmptyView';

function MenuView() {
  const activeCategoryId = useSelector((state) => state.menus.views.itemId);

  return (
    <Paper variant="outlined">
      {activeCategoryId ? (
        <React.Fragment>
          <Menu />
        </React.Fragment>
      ) : (
        <EmptyView message="Wählen sie ein Menü aus der Liste aus, um sie anzuzeigen..." />
      )}
    </Paper>
  );
}

export default MenuView;
