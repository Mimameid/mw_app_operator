import React from 'react';
import { useSelector } from 'react-redux';
import { nanoid } from 'common/constants';

import { Box, Divider, Grid, List, ListSubheader } from '@mui/material';
import CategoryOverviewItem from './CategoryOverviewItem';
import GridHeaderItem from 'common/components/dataDisplay/GridHeaderItem';
import EmptyView from '../../ItemView/EmptyView';

function CategoryOverview() {
  const categoriesArray = useSelector((state) => {
    let categoriesArray = Object.values(state.menus.categories.byId);
    categoriesArray.sort((a, b) => a.name.localeCompare(b.name));
    return categoriesArray;
  });
  const selectedCategoryId = useSelector((state) => state.menus.views.itemId);

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
            Speisen
          </GridHeaderItem>
          <GridHeaderItem item xs={2}>
            Erstellt
          </GridHeaderItem>
        </Grid>
      </ListSubheader>
      <Divider />
      <Box sx={{ overflow: 'auto', height: '194px' }}>
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
