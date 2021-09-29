import React from 'react';
import { useSelector } from 'react-redux';
import { nanoid } from 'common/constants';

import { Box, Divider, Grid, List, ListSubheader, makeStyles } from '@material-ui/core';
import CategoryOverviewItem from './CategoryOverviewItem';
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
            Speisen
          </GridHeaderItem>
          <GridHeaderItem item xs={2}>
            Erstellt
          </GridHeaderItem>
        </Grid>
      </ListSubheader>
      <Divider className={classes.divider} />
      <Box className={classes.listBody}>
        {categoriesArray.length === 0 ? (
          <EmptyView>Keine Kategorien verfügbar. Bitte erstellen Sie eine Kategorie...</EmptyView>
        ) : (
          categoriesArray.map((category, index) => (
            <React.Fragment key={nanoid()}>
              <CategoryOverviewItem category={category} selected={category.id === selectedCategoryId} />
              {categoriesArray.length >= 5 && index === categoriesArray.length - 1 ? null : <Divider />}
            </React.Fragment>
          ))
        )}
      </Box>
    </List>
  );
}

export default CategoryOverview;
