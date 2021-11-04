import React, { useState } from 'react';

import { Box, Checkbox, Grid, IconButton, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import EditSub from '../../../subs/components/EditSub';
import DeleteSub from 'features/menus/subs/components/DeleteSub';
import { DeleteForever, Edit } from '@mui/icons-material';

function SubItem({ sub, checked, handleToggle }) {
  const [editSubOpen, setEditSubOpen] = useState(false);
  const [triggerDelete, setTriggerDelete] = useState(false);

  function handleEditSub(event) {
    setEditSubOpen(true);
    event.stopPropagation();
  }

  function handleDeleteSub(event) {
    setTriggerDelete(true);
    event.stopPropagation();
  }

  return (
    <React.Fragment>
      <ListItem dense button onClick={handleToggle(sub.id)}>
        <ListItemIcon sx={{ minWidth: '32px' }}>
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
        <Grid container justifyContent="flex-start">
          <Grid item xs={8}>
            <ListItemText primary={sub.name} secondary={sub.desc} />
          </Grid>
          <Grid item xs={4}>
            <ListItemText primary={sub.price.toFixed(2) + '€'} />
          </Grid>
        </Grid>

        <Box display="flex">
          <IconButton edge="end" aria-label="edit" onClick={handleEditSub} size="large">
            <Edit fontSize="small" />
          </IconButton>
          <IconButton edge="end" aria-label="delete" onClick={handleDeleteSub} size="large">
            <DeleteForever fontSize="small" color="error" />
          </IconButton>
        </Box>
      </ListItem>
      <EditSub open={editSubOpen} setOpen={setEditSubOpen} sub={sub} />
      <DeleteSub trigger={triggerDelete} setTrigger={setTriggerDelete} subId={sub.id} />
    </React.Fragment>
  );
}

export default SubItem;
