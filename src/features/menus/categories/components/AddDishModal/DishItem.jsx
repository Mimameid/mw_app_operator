import React, { useState } from 'react';

import {
  Checkbox,
  Grid,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import EditDish from 'features/menus/dishes/components/EditDish';
import DeleteDish from 'features/menus/dishes/components/DeleteDish';
import { DeleteForever, Edit } from '@material-ui/icons';

function DishItem({ dish, checked, handleToggle }) {
  const [editDishOpen, setEditDishOpen] = useState(false);
  const [triggerDelete, setTriggerDelete] = useState(false);

  function handleEditDish() {
    setEditDishOpen(true);
  }

  function handleDeleteDish() {
    setTriggerDelete(true);
  }

  return (
    <React.Fragment>
      <ListItem dense button onClick={handleToggle(dish.id)}>
        <ListItemIcon>
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
        <Grid container justify="flex-start">
          <Grid item xs={8}>
            <ListItemText primary={dish.name} secondary={dish.desc} />
          </Grid>
          <Grid item xs={4}>
            <ListItemText primary={dish.price + '€'} secondary={dish.type} />
          </Grid>
        </Grid>

        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="edit" onClick={handleEditDish}>
            <Edit fontSize="small" />
          </IconButton>
          <IconButton edge="end" aria-label="delete" onClick={handleDeleteDish}>
            <DeleteForever fontSize="small" color="error" />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <EditDish open={editDishOpen} setOpen={setEditDishOpen} dish={dish} />
      <DeleteDish trigger={triggerDelete} setTrigger={setTriggerDelete} dishId={dish.id} />
    </React.Fragment>
  );
}

export default DishItem;
