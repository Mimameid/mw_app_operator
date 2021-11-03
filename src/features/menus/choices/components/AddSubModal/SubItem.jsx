import React, { useState } from 'react';

import { Box, Checkbox, Grid, IconButton, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import EditSub from '../../../subs/components/EditSub';
import DeleteSub from 'features/menus/subs/components/DeleteSub';
import { DeleteForever, Edit } from '@material-ui/icons';

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

function SubItem({ sub, checked, handleToggle }) {
  const classes = useStyles();
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
        <ListItemIcon className={classes.checkBoxContainer}>
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
            <ListItemText
              primary={<span className={classes.textContainer}>{sub.name}</span>}
              secondary={<span className={classes.textContainer}>{sub.desc}</span>}
            />
          </Grid>
          <Grid item xs={4}>
            <ListItemText primary={sub.price.toFixed(2) + '€'} />
          </Grid>
        </Grid>

        <Box display="flex">
          <IconButton edge="end" aria-label="edit" onClick={handleEditSub}>
            <Edit fontSize="small" />
          </IconButton>
          <IconButton edge="end" aria-label="delete" onClick={handleDeleteSub}>
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
