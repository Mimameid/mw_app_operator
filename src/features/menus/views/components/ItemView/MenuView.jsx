import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectActiveMenu } from 'features/menus/menus/slice';
import { selectItem } from '../../slice';

import Menu from 'features/menus/menus/components/Menu';
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
    <EmptyView>Wählen Sie ein Speisekarte aus der Liste aus, um sie anzuzeigen...</EmptyView>
  );
}

export default MenuView;
