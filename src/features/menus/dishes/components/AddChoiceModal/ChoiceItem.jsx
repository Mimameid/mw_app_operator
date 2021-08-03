import React, { useState } from 'react';

import { Box, Checkbox, Grid, IconButton, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import EditChoice from 'features/menus/choices/components/EditChoice';
import DeleteChoice from 'features/menus/choices/components/DeleteChoice';
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

function ChoiceItem({ choice, checked, handleToggle }) {
  const classes = useStyles();
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
        <ListItemIcon className={classes.checkBoxContainer}>
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
        <Grid container justifyContent="flex-start">
          <Grid item xs={8}>
            <ListItemText
              primary={<span className={classes.textContainer}>{choice.name}</span>}
              secondary={<span className={classes.textContainer}>{choice.desc}</span>}
            />
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
      <EditChoice open={editChoiceOpen} setOpen={setEditChoiceOpen} choice={choice} />
      <DeleteChoice trigger={triggerDelete} setTrigger={setTriggerDelete} choiceId={choice.id} />
    </React.Fragment>
  );
}

export default ChoiceItem;
