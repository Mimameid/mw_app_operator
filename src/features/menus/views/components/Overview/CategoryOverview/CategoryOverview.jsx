import React from 'react';
import { useSelector } from 'react-redux';
import { nanoid } from 'common/constants';

import { Divider, Grid, List, ListSubheader, makeStyles } from '@material-ui/core';
import CategoryOverviewItem from './CategoryOverviewItem';
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

function CategoryOverview() {
  const classes = useStyles();
  const categoriesArray = useSelector((state) => {
    let categoriesArray = Object.values(state.menus.categories.byId);
    categoriesArray.sort((a, b) => a.name.localeCompare(b.name));
    return categoriesArray;
  });
  const selectedCategoryId = useSelector((state) => state.menus.views.itemId);

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
            Speisen
          </Grid>
          <Grid item xs={2}>
            Erstellt
          </Grid>
        </Grid>
      </ListSubheader>
      <Divider className={classes.divider} />
      {categoriesArray.length === 0 ? (
        <EmptyView>Keine Kategorien verfügbar. Bitte fügen Sie eine Kategorie hinzu...</EmptyView>
      ) : (
        categoriesArray.map((category, index) => (
          <React.Fragment key={nanoid()}>
            <CategoryOverviewItem category={category} selected={category.id === selectedCategoryId} />
            <Divider />
          </React.Fragment>
        ))
      )}
    </List>
  );
}

export default CategoryOverview;
