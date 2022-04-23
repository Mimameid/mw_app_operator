import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectItem } from 'features/offers/views/slice';
import { setAvailable } from 'features/offers/dishes/actions';

import { Grid, IconButton, ListItem, Switch, Box } from '@mui/material';
import GridItem from 'common/components/dataDisplay/GridItem';
import EditDish from 'features/offers/dishes/components/EditDish';
import { DeleteForever, Edit } from '@mui/icons-material';

function DishOverviewItem({ dish, setTriggerDelete, selected }) {
  const dispatch = useDispatch();

  const [editModalOpen, setEditModalOpen] = useState(false);

  function handleEditDish(event) {
    setEditModalOpen(true);
  }

  function handleSelectDish(event) {
    dispatch(selectItem(dish.id));
  }

  function handleDisableDish(event) {
    dispatch(setAvailable({ dishId: dish.id, isAvailable: event.target.checked }));
  }

  return (
    <React.Fragment>
      <ListItem
        sx={{ px: 2, py: 1, bgcolor: (theme) => (selected ? theme.palette.primary.light + '33' : null) }}
        button={!selected}
        onClick={!selected ? handleSelectDish : null}
      >
        <Grid container>
          <GridItem item xs={1}>
            {dish.id}
          </GridItem>
          <GridItem item xs={2}>
            {dish.name}
          </GridItem>
          <GridItem item xs={2}>
            {dish.desc}
          </GridItem>
          <GridItem item xs={2}>
            {dish.choices.length}
          </GridItem>
          <GridItem item xs={2}>
            {new Date(dish.created).toLocaleDateString('DE-de')}
          </GridItem>
          <Grid sx={{ display: 'flex', alignItems: 'center' }} item xs={1}>
            <Switch
              checked={dish.isAvailable}
              onChange={handleDisableDish}
              color="primary"
              size="small"
              inputProps={{ 'aria-label': 'dish available checkbox' }}
            />
          </Grid>
          <Box
            sx={{ visibility: selected ? 'visible' : 'hidden' }}
            display="flex"
            flexGrow={1}
            justifyContent="flex-end"
          >
            <IconButton aria-label="edit" size="small" onClick={handleEditDish}>
              <Edit fontSize="small" />
            </IconButton>
            <IconButton aria-label="edit" size="small" onClick={() => setTriggerDelete(true)}>
              <DeleteForever fontSize="small" color="error" />
            </IconButton>
          </Box>
        </Grid>
      </ListItem>

      <EditDish open={editModalOpen} onClose={() => setEditModalOpen(false)} dish={dish} />
    </React.Fragment>
  );
}

export default React.memo(DishOverviewItem);
