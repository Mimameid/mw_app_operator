import React from 'react';
import { useSelector } from 'react-redux';
import { nanoid } from 'common/constants';
import { selectActiveMenu } from 'features/menus/menus/slice';

import { Divider, Grid, List, ListSubheader, makeStyles } from '@material-ui/core';
import MenuOverviewItem from './MenuOverviewItem';
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
          <Grid item xs={2}>
            ID
          </Grid>
          <Grid item xs={2}>
            Name
          </Grid>
          <Grid item xs={2}>
            Beschreibung
          </Grid>
          <Grid item xs={2}>
            Kategorien
          </Grid>
          <Grid item xs={2}>
            Erstellt
          </Grid>
          <Grid item xs={2}>
            Aktiv
          </Grid>
        </Grid>
      </ListSubheader>
      <Divider />
      {menusArray.length === 0 ? (
        <EmptyView>Keine Menüs verfügbar. Bitte fügen Sie ein Menü hinzu...</EmptyView>
      ) : (
        menusArray.map((menu, index) => (
          <React.Fragment key={nanoid()}>
            <MenuOverviewItem menu={menu} activeMenuId={activeMenu?.id} selected={menu.id === selectedMenuId} />
            <Divider />
          </React.Fragment>
        ))
      )}
    </List>
  );
}

export default MenuOverview;
