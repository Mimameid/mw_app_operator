import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectActiveMenu } from 'features/products/menus/slice';
import { selectItem } from '../../slice';

import Menu from 'features/products/menus/components/Menu';
import EmptyView from './EmptyView';

function MenuView() {
  const dispatch = useDispatch();
  const selectedMenuId = useSelector((state) => state.menus.views.itemId);
  const activeMenu = useSelector(selectActiveMenu);

  useEffect(() => {
    if (activeMenu) {
      dispatch(selectItem(activeMenu.id));
    }
  }, [dispatch, activeMenu]);

  return selectedMenuId ? (
    <React.Fragment>
      <Menu />
    </React.Fragment>
  ) : (
    <EmptyView>Wählen Sie ein Menü aus der Liste aus, um es anzuzeigen...</EmptyView>
  );
}

export default MenuView;
