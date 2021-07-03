import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeSelectAffectedCategories } from 'features/menus/categories/categoriesSlice';
import { deleteDish } from '../dishesSlice';

import {
  Checkbox,
  Grid,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import WarningDialog from 'common/components/other/WarningDialog';
import EditDishModal from './EditDishModal';
// import EditCategoryModal from './EditCategoryModal';
import { Delete, Edit } from '@material-ui/icons';

function DishItem({ dish, checked, handleToggle }) {
  const dispatch = useDispatch();
  const selectAffectedCategories = useMemo(makeSelectAffectedCategories, []);
  const affectedCategories = useSelector((state) => selectAffectedCategories(state, dish.id));

  const [editDishOpen, setEditDishOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  function handleEditDish() {
    if (affectedCategories.length > 0) {
      setEditDialogOpen(true);
      return;
    }
    setEditDishOpen(true);
  }

  function handleDeleteDish() {
    setDeleteDialogOpen(true);
  }

  const handleRejectDialog = (event) => {
    if (editDialogOpen) {
      setEditDialogOpen(false);
    }
    if (deleteDialogOpen) {
      setDeleteDialogOpen(false);
    }
  };

  const handleAcceptDialog = (event) => {
    if (editDialogOpen) {
      setEditDialogOpen(false);
      setEditDishOpen(true);
    }

    if (deleteDialogOpen) {
      dispatch(deleteDish(dish.id));
      setDeleteDialogOpen(false);
    }
  };

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
            <Delete fontSize="small" />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <EditDishModal open={editDishOpen} setOpen={setEditDishOpen} dish={dish} />
      <WarningDialog
        open={deleteDialogOpen}
        title="Speise löschen?"
        message={
          affectedCategories.length > 0
            ? 'Das Löschen der Speise löscht die Speise in sämtlichen Kategorien und sämtlichen Menüs in denen die Kategorie vorkommt. Betroffene Kategorien: ' +
              affectedCategories.toString() +
              '.'
            : 'Sind Sie sicher, dass Sie die Speise löschen wollen?'
        }
        handleReject={handleRejectDialog}
        handleAccept={handleAcceptDialog}
      />{' '}
      <WarningDialog
        open={editDialogOpen}
        title="Speise bearbeiten?"
        message={
          'Das Bearbeiten der Speise ändert die Speise in sämtlichen Kategorien und sämtlichen Menüs in denen die Kategorie vorkommt. Betroffene Kategorien: ' +
          affectedCategories.toString() +
          '.'
        }
        handleReject={handleRejectDialog}
        handleAccept={handleAcceptDialog}
      />
    </React.Fragment>
  );
}

export default DishItem;
