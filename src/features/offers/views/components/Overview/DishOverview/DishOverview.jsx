import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Box, Divider, Grid, List, ListSubheader } from '@mui/material';
import DishOverviewItem from './DishOverviewItem';
import DeleteDish from 'features/offers/dishes/components/DeleteDish';
import GridHeaderItem from 'common/components/dataDisplay/GridHeaderItem';
import EmptyView from '../../ItemView/EmptyView';

function DishOverview() {
  const dishesArray = useSelector((state) => {
    let dishesArray = Object.values(state.offers.dishes.byId);
    dishesArray.sort((a, b) => a.name.localeCompare(b.name));
    return dishesArray;
  });
  const selectedDishId = useSelector((state) => state.offers.views.itemId);
  const [triggerDelete, setTriggerDelete] = useState(false);

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
            OG
          </GridHeaderItem>
          <GridHeaderItem item xs={2}>
            Erstellt
          </GridHeaderItem>
          <GridHeaderItem item xs={2}>
            Verfügbar
          </GridHeaderItem>
        </Grid>
      </ListSubheader>
      <Divider />
      <Box sx={{ overflow: 'auto', height: '234px' }}>
        {dishesArray.length === 0 ? (
          <EmptyView>Keine Speisen verfügbar. Bitte erstellen Sie eine Speise...</EmptyView>
        ) : (
          dishesArray.map((dish, index) => (
            <React.Fragment key={dish.id}>
              <DishOverviewItem dish={dish} setTriggerDelete={setTriggerDelete} selected={dish.id === selectedDishId} />
              {dishesArray.length >= 5 && index === dishesArray.length - 1 ? null : <Divider />}
            </React.Fragment>
          ))
        )}
      </Box>
      <DeleteDish trigger={triggerDelete} setTrigger={setTriggerDelete} dishId={selectedDishId} />
    </List>
  );
}

export default DishOverview;
