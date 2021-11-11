import React from 'react';
import { useSelector } from 'react-redux';
import { selectActiveMenu } from 'features/menus/menus/slice';

import { Box, Divider } from '@mui/material';
import EmptyView from 'features/discounts/views/components/ItemView/EmptyView';
import MenuOverviewItem from './MenuOverviewItem';

function MenuOverviewItemsContainer() {
  const menusArray = useSelector((state) => {
    let menusArray = Object.values(state.menus.menus.byId);
    menusArray.sort((a, b) => a.name.localeCompare(b.name));
    return menusArray;
  });
  const activeMenu = useSelector(selectActiveMenu);
  const selectedMenuId = useSelector((state) => state.menus.views.itemId);

  return (
    <Box sx={{ overflow: 'auto', height: '234px' }}>
      {menusArray.length === 0 ? (
        <EmptyView>Keine Menüs verfügbar. Bitte erstellen Sie ein Menü...</EmptyView>
      ) : (
        menusArray.map((menu, index) => (
          <React.Fragment key={menu.id}>
            <MenuOverviewItem menu={menu} activeMenu={activeMenu} selected={menu.id === selectedMenuId} />
            {menusArray.length >= 5 && index === menusArray.length - 1 ? null : <Divider />}
          </React.Fragment>
        ))
      )}
    </Box>
  );
}

export default MenuOverviewItemsContainer;
