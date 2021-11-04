import React, { useState } from 'react';

import { Box, Checkbox, Grid, IconButton, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import EditDish from 'features/menus/dishes/components/EditDish';
import DeleteDish from 'features/menus/dishes/components/DeleteDish';
import { DeleteForever, Edit } from '@mui/icons-material';

function DishItem({ dish, checked, handleToggle }) {
  const [editDishOpen, setEditDishOpen] = useState(false);
  const [triggerDelete, setTriggerDelete] = useState(false);

  function handleEditDish(event) {
    setEditDishOpen(true);
    event.stopPropagation();
  }

  function handleDeleteDish(event) {
    setTriggerDelete(true);
    event.stopPropagation();
  }

  return (
    <React.Fragment>
      <ListItem dense button onClick={handleToggle(dish.id)}>
        <ListItemIcon sx={{ minWidth: '32px' }}>
          <Checkbox
            color="primary"
            edge="start"
            checked={checked}
            tabIndex={-1}
            disableRipple
            size="small"
            inputProps={{ 'aria-labelledby': dish.id }}
          />
        </ListItemIcon>
        <Grid container justifyContent="flex-start">
          <Grid item xs={8}>
            <ListItemText primary={dish.name} secondary={dish.desc} />
          </Grid>
          <Grid item xs={4}>
            <ListItemText primary={dish.price.toFixed(2) + '€'} secondary={dish.type} />
          </Grid>
        </Grid>

        <Box display="flex">
          <IconButton edge="end" aria-label="edit" onClick={handleEditDish} size="large">
            <Edit fontSize="small" />
          </IconButton>
          <IconButton edge="end" aria-label="delete" onClick={handleDeleteDish} size="large">
            <DeleteForever fontSize="small" color="error" />
          </IconButton>
        </Box>
      </ListItem>
      <EditDish open={editDishOpen} setOpen={setEditDishOpen} dish={dish} />
      <DeleteDish trigger={triggerDelete} setTrigger={setTriggerDelete} dishId={dish.id} />
    </React.Fragment>
  );
}

export default DishItem;
