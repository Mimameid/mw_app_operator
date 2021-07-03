import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeSelectAffectedChoices } from 'features/menus/choices/choicesSlice';
import { deleteSub } from '../subsSlice';

import {
  Checkbox,
  Grid,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import EditSubModal from './EditSubModal';
import WarningDialog from 'common/components/other/WarningDialog';
import { Delete, Edit } from '@material-ui/icons';

function SubItem({ sub, checked, handleToggle }) {
  const dispatch = useDispatch();
  const selectAffectedChoices = useMemo(makeSelectAffectedChoices, []);
  const affectedChoices = useSelector((state) => selectAffectedChoices(state, sub.id));

  const [editSubOpen, setEditSubOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  function handleEditSub() {
    if (affectedChoices.length > 0) {
      setEditDialogOpen(true);
      return;
    }
    setEditSubOpen(true);
  }

  function handleDeleteSub() {
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
      setEditSubOpen(true);
    }

    if (deleteDialogOpen) {
      dispatch(deleteSub(sub.id));
      setDeleteDialogOpen(false);
    }
  };

  return (
    <React.Fragment>
      <ListItem dense button onClick={handleToggle(sub.id)}>
        <ListItemIcon>
          <Checkbox
            color="primary"
            edge="start"
            checked={checked}
            tabIndex={-1}
            disableRipple
            size="small"
            inputProps={{ 'aria-labelledby': sub.id }}
          />
        </ListItemIcon>
        <Grid container justify="flex-start">
          <Grid item xs={8}>
            <ListItemText primary={sub.name} />
          </Grid>
          <Grid item xs={4}>
            <ListItemText primary={sub.price + '€'} />
          </Grid>
        </Grid>

        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="edit" onClick={handleEditSub}>
            <Edit fontSize="small" />
          </IconButton>
          <IconButton edge="end" aria-label="delete" onClick={handleDeleteSub}>
            <Delete fontSize="small" />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <EditSubModal open={editSubOpen} setOpen={setEditSubOpen} sub={sub} />
      <WarningDialog
        open={deleteDialogOpen}
        title="Option löschen?"
        message={
          affectedChoices.length > 0
            ? 'Das Löschen der Option löscht die Option in sämtlichen Extras. Betroffene Extras: ' +
              affectedChoices.toString() +
              '.'
            : 'Sind Sie sicher, dass Sie die Speise löschen wollen?'
        }
        handleReject={handleRejectDialog}
        handleAccept={handleAcceptDialog}
      />
      <WarningDialog
        open={editDialogOpen}
        title="Option bearbeiten?"
        message={
          'Das Bearbeiten der Option ändert die Option in sämtlichen Extras und sämtlichen Menüs in denen das Extra vorkommt. Betroffene Extras: ' +
          affectedChoices.toString() +
          '.'
        }
        handleReject={handleRejectDialog}
        handleAccept={handleAcceptDialog}
      />
    </React.Fragment>
  );
}

export default SubItem;
