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
import EditChoice from 'features/menus/choices/components/EditChoice';
import DeleteChoice from 'features/menus/choices/components/DeleteChoice';
import { DeleteForever, Edit } from '@material-ui/icons';

function ChoiceItem({ choice, checked, handleToggle }) {
  const [editChoiceOpen, setEditChoiceOpen] = useState(false);
  const [triggerDelete, setTriggerDelete] = useState(false);

  function handleEditDish() {
    setEditChoiceOpen(true);
  }

  function handleDeleteDish() {
    setTriggerDelete(true);
  }

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
            <DeleteForever fontSize="small" color="error" />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <EditChoice open={editChoiceOpen} setOpen={setEditChoiceOpen} choice={choice} />
      <DeleteChoice trigger={triggerDelete} setTrigger={setTriggerDelete} choiceId={choice.id} />
    </React.Fragment>
  );
}

export default ChoiceItem;
