import React from 'react';
import { useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';

import { Box, Grid, List, ListSubheader, makeStyles, Divider } from '@material-ui/core';
import MenuOverviewItem from './MenuOverviewItem';

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
  const menus = useSelector((state) => state.menus.menus.byId);
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
        </Grid>
      </ListSubheader>
      {Object.values(menus).length === 0 ? (
        <Box color="text.secondary" fontStyle="italic" p={1}>
          Keine Menüs verfügbar. Bitte fügen Sie ein Menü hinzu...
        </Box>
      ) : (
        Object.values(menus).map((menu, index) => (
          <React.Fragment key={nanoid()}>
            <MenuOverviewItem menu={menu} selected={menu.id === selectedMenuId} />
            <Divider />
          </React.Fragment>
        ))
      )}
    </List>
  );
}

export default MenuOverview;
