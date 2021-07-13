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
import EditSub from '../../../subs/components/EditSub';
import { DeleteForever, Edit } from '@material-ui/icons';
import DeleteSub from 'features/menus/subs/components/DeleteSub';

function SubItem({ sub, checked, handleToggle }) {
  const [editSubOpen, setEditSubOpen] = useState(false);
  const [triggerDelete, setTriggerDelete] = useState(false);

  function handleEditSub() {
    setEditSubOpen(true);
  }

  function handleDeleteSub() {
    setTriggerDelete(true);
  }

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
            <DeleteForever fontSize="small" color="error" />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <EditSub open={editSubOpen} setOpen={setEditSubOpen} sub={sub} />
      <DeleteSub trigger={triggerDelete} setTrigger={setTriggerDelete} subId={sub.id} />
    </React.Fragment>
  );
}

export default SubItem;
