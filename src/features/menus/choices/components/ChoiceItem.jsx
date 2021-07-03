import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeSelectAffectedDishes } from 'features/menus/dishes/dishesSlice';
import { deleteChoice } from '../choicesSlice';

import {
  Checkbox,
  Grid,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import EditChoiceModal from './EditChoiceModal';
import WarningDialog from 'common/components/other/WarningDialog';
import { Delete, Edit } from '@material-ui/icons';

function ChoiceItem({ choice, checked, handleToggle }) {
  const dispatch = useDispatch();
  const selectAffectedDishes = useMemo(makeSelectAffectedDishes, []);
  const affectedDishes = useSelector((state) => selectAffectedDishes(state, choice.id));

  const [editChoiceOpen, setEditChoiceOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  function handleEditDish() {
    if (affectedDishes.length > 0) {
      setEditDialogOpen(true);
      return;
    }
    setEditChoiceOpen(true);
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
      setEditChoiceOpen(true);
    }

    if (deleteDialogOpen) {
      dispatch(deleteChoice(choice.id));
      setDeleteDialogOpen(false);
    }
  };

  return (
    <React.Fragment>
      <ListItem dense button onClick={handleToggle(choice.id)}>
        <ListItemIcon>
          <Checkbox
            color="primary"
            edge="start"
            checked={checked}
            tabIndex={-1}
            disableRipple
            size="small"
            inputProps={{ 'aria-labelledby': choice.id }}
          />
        </ListItemIcon>
        <Grid container justify="flex-start">
          <Grid item xs={8}>
            <ListItemText primary={choice.name} secondary={choice.desc} />
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
      <EditChoiceModal open={editChoiceOpen} setOpen={setEditChoiceOpen} choice={choice} />
      <WarningDialog
        open={deleteDialogOpen}
        title="Extra löschen?"
        message={
          affectedDishes.length > 0
            ? 'Das Löschen des Extras löscht das Extra in sämtlichen Speisen und sämtlichen Menüs in denen die Speise vorkommt. Betroffene Speisen: ' +
              affectedDishes.toString() +
              '.'
            : 'Sind Sie sicher, dass Sie das Extra löschen wollen?'
        }
        handleReject={handleRejectDialog}
        handleAccept={handleAcceptDialog}
      />
      <WarningDialog
        open={editDialogOpen}
        title="Extra bearbeiten?"
        message={
          'Das Bearbeiten des Extras ändert das Extra in sämtlichen Speisen und sämtlichen Menüs in denen die Speise vorkommt. Betroffene Speisen: ' +
          affectedDishes.toString() +
          '.'
        }
        handleReject={handleRejectDialog}
        handleAccept={handleAcceptDialog}
      />
    </React.Fragment>
  );
}

export default ChoiceItem;
