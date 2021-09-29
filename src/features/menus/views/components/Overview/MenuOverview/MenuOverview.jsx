import React from 'react';
import { useSelector } from 'react-redux';
import { nanoid } from 'common/constants';
import { selectActiveMenu } from 'features/menus/menus/slice';

import { Box, Divider, Grid, List, ListSubheader, makeStyles } from '@material-ui/core';
import MenuOverviewItem from './MenuOverviewItem';
import GridHeaderItem from 'common/components/other/GridHeaderItem';
import EmptyView from '../../ItemView/EmptyView';

const useStyles = makeStyles((theme) => ({
  list: {
    padding: 0,
  },
  listHeader: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,

    borderBottom: '1px solid ' + theme.palette.primary.main,
    boxShadow: theme.shadows[3],
  },
  listBody: {
    overflow: 'auto',
    height: '213px',
  },
}));

function MenuOverview() {
  const classes = useStyles();
  const menusArray = useSelector((state) => {
    let menusArray = Object.values(state.menus.menus.byId);
    menusArray.sort((a, b) => a.name.localeCompare(b.name));
    return menusArray;
  });
  const activeMenu = useSelector(selectActiveMenu);
  const selectedMenuId = useSelector((state) => state.menus.views.itemId);

  return (
    <List className={classes.list}>
      <ListSubheader className={classes.listHeader}>
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
      <Box className={classes.listBody}>
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
