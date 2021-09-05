import React from 'react';
import { useSelector } from 'react-redux';

import { Divider, Grid, List, ListSubheader, makeStyles } from '@material-ui/core';
import DishOverviewItem from './DishOverviewItem';
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

function DishOverview() {
  const classes = useStyles();
  const dishes = useSelector((state) => state.menus.dishes.byId);
  const selectedDishId = useSelector((state) => state.menus.views.itemId);

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
          <Grid item xs={1}>
            OG
          </Grid>
          <Grid item xs={2}>
            Erstellt
          </Grid>
          <Grid item xs={1}>
            Verfügbar
          </Grid>
        </Grid>
      </ListSubheader>
      <Divider className={classes.divider} />
      {Object.values(dishes).length === 0 ? (
        <EmptyView>Keine Speisen verfügbar. Bitte fügen Sie eine Speise hinzu...</EmptyView>
      ) : (
        Object.values(dishes).map((dish, index) => (
          <React.Fragment key={dish.id}>
            <DishOverviewItem dish={dish} selected={dish.id === selectedDishId} />
            <Divider />
          </React.Fragment>
        ))
      )}
    </List>
  );
}

export default DishOverview;
