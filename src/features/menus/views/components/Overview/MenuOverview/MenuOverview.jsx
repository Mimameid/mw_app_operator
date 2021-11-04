import React from 'react';
import { useSelector } from 'react-redux';
import { nanoid } from 'common/constants';
import { selectActiveMenu } from 'features/menus/menus/slice';

import { Box, Divider, Grid, List, ListSubheader } from '@mui/material';
import MenuOverviewItem from './MenuOverviewItem';
import GridHeaderItem from 'common/components/dataDisplay/GridHeaderItem';
import EmptyView from '../../ItemView/EmptyView';

function MenuOverview() {
  const menusArray = useSelector((state) => {
    let menusArray = Object.values(state.menus.menus.byId);
    menusArray.sort((a, b) => a.name.localeCompare(b.name));
    return menusArray;
  });
  const activeMenu = useSelector(selectActiveMenu);
  const selectedMenuId = useSelector((state) => state.menus.views.itemId);

  return (
    <List sx={{ p: 0 }}>
      <ListSubheader
        sx={{
          color: 'common.white',
          bgcolor: 'primary.main',

          borderBottom: (theme) => '1px solid ' + theme.palette.primary.main,
          boxShadow: (theme) => theme.shadows[3],
        }}
      >
        <Grid container>
          <GridHeaderItem item xs={1}>
            ID
          </GridHeaderItem>
          <GridHeaderItem item xs={2}>
            Name
          </GridHeaderItem>
          <GridHeaderItem item xs={2}>
            Beschreibung
          </GridHeaderItem>
          <GridHeaderItem item xs={2}>
            Kategorie
          </GridHeaderItem>
          <GridHeaderItem item xs={2}>
            Erstellt
          </GridHeaderItem>
          <GridHeaderItem item xs={1}>
            Aktiv
          </GridHeaderItem>
        </Grid>
      </ListSubheader>
      <Divider />
      <Box sx={{ overflow: 'auto', height: '194px' }}>
        {menusArray.length === 0 ? (
          <EmptyView>Keine Menüs verfügbar. Bitte erstellen Sie ein Menü...</EmptyView>
        ) : (
          menusArray.map((menu, index) => (
            <React.Fragment key={nanoid()}>
              <MenuOverviewItem menu={menu} activeMenuId={activeMenu?.id} selected={menu.id === selectedMenuId} />
              {menusArray.length >= 5 && index === menusArray.length - 1 ? null : <Divider />}
            </React.Fragment>
          ))
        )}
      </Box>
    </List>
  );
}

export default MenuOverview;
