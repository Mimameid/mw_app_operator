import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectItem } from 'features/menus/views/slice';
import { setAvailable } from 'features/menus/dishes/actions';

import { Grid, IconButton, ListItem, Switch, makeStyles, Box } from '@material-ui/core';
import GridItem from 'common/components/other/GridItem';
import EditDish from 'features/menus/dishes/components/EditDish';
import DeleteDish from 'features/menus/dishes/components/DeleteDish';
import { DeleteForever, Edit } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  noHover: {
    '&:hover': {
      backgroundColor: theme.palette.primary.light + '33',
    },
  },
  highlight: {
    background: theme.palette.primary.light + '33',
  },
  hidden: {
    visibility: 'hidden',
  },
}));

function DishOverviewItem({ dish, selected }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [triggerDelete, setTriggerDelete] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  function handleEditDish(event) {
    setEditModalOpen(true);
  }

  function handleSelectDish(event) {
    dispatch(selectItem(dish.id));
  }

  function handleDeleteDish(event) {
    setTriggerDelete(true);
  }

  function handleDisableDish(event) {
    dispatch(setAvailable({ dishId: dish.id, available: event.target.checked }));
  }

  return (
    <React.Fragment>
      <ListItem
        className={selected ? classes.highlight : null}
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
          <GridItem item xs={1}>
            <Switch
              checked={dish.available}
              onChange={handleDisableDish}
              color="primary"
              size="small"
              inputProps={{ 'aria-label': 'dish available checkbox' }}
            />
          </GridItem>
          <Box className={selected ? null : classes.hidden} display="flex" flexGrow={1} justifyContent="flex-end">
            <IconButton aria-label="edit" size="small" onClick={handleEditDish}>
              <Edit fontSize="small" />
            </IconButton>
            <IconButton aria-label="edit" size="small" onClick={handleDeleteDish}>
              <DeleteForever fontSize="small" color="error" />
            </IconButton>
          </Box>
        </Grid>
      </ListItem>
      <EditDish open={editModalOpen} setOpen={setEditModalOpen} dish={dish} />
      <DeleteDish trigger={triggerDelete} setTrigger={setTriggerDelete} dishId={dish.id} />
    </React.Fragment>
  );
}

export default DishOverviewItem;
