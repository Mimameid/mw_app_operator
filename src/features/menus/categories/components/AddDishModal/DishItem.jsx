import React, { useState } from 'react';

import { Box, Checkbox, Grid, IconButton, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import EditDish from 'features/menus/dishes/components/EditDish';
import DeleteDish from 'features/menus/dishes/components/DeleteDish';
import { DeleteForever, Edit } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  textContainer: {
    display: 'block',
    overflow: 'hidden',
    paddingRight: theme.spacing(2),
    maxWidth: '220px',

    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  checkBoxContainer: {
    minWidth: '32px',
  },
}));

function DishItem({ dish, checked, handleToggle }) {
  const classes = useStyles();
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
        <ListItemIcon className={classes.checkBoxContainer}>
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
            <ListItemText
              primary={<span className={classes.textContainer}>{dish.name}</span>}
              secondary={<span className={classes.textContainer}>{dish.desc}</span>}
            />
          </Grid>
          <Grid item xs={4}>
            <ListItemText primary={dish.price + '€'} secondary={dish.type} />
          </Grid>
        </Grid>

        <Box display="flex">
          <IconButton edge="end" aria-label="edit" onClick={handleEditDish}>
            <Edit fontSize="small" />
          </IconButton>
          <IconButton edge="end" aria-label="delete" onClick={handleDeleteDish}>
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
