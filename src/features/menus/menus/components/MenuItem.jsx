import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectMenu, deleteMenu } from '../menusSlice';

import { Grid, IconButton, ListItem, makeStyles } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import WarningDialog from 'common/components/other/WarningDialog';
import EditMenuModal from './EditMenuModal';

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

function MenuItem({ menu, selected }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMenuOpen, setEditMenuOpen] = useState(false);

  function editEntryHandler(event) {
    setEditMenuOpen(true);
  }

  function handleSelectMenu(event) {
    dispatch(selectMenu(menu.id));
  }

  function deleteEntryHandler(event) {
    setDialogOpen(true);
  }

  function handleRejectDialog(event) {
    setDialogOpen(false);
  }

  function handleAcceptDialog(event) {
    dispatch(deleteMenu(menu.id));
    setDialogOpen(false);
  }

  return (
    <React.Fragment>
      <ListItem
        className={selected ? classes.highlight : null}
        button={!selected}
        onClick={!selected ? handleSelectMenu : null}
      >
        <Grid container>
          <Grid item xs={2}>
            {menu.id}
          </Grid>
          <Grid item xs={2}>
            {menu.name}
          </Grid>
          <Grid item xs={3}>
            {menu.desc}
          </Grid>
          <Grid item xs={2}>
            {menu.categories.length}
          </Grid>
          <Grid item xs={2}>
            {new Date(menu.created).toLocaleDateString('DE-de')}
          </Grid>
          <Grid className={selected ? null : classes.hidden} item xs={1}>
            <IconButton aria-label="edit" size="small" onClick={editEntryHandler}>
              <Edit fontSize="small" />
            </IconButton>
            <IconButton aria-label="edit" size="small" onClick={deleteEntryHandler}>
              <Delete fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      </ListItem>
      <WarningDialog
        open={dialogOpen}
        title="Menü löschen?"
        message="Diese Vorgang kann nicht rückgängig gemacht werden."
        handleReject={handleRejectDialog}
        handleAccept={handleAcceptDialog}
        warning
      />
      <EditMenuModal open={editMenuOpen} setOpen={setEditMenuOpen} menu={menu} />
    </React.Fragment>
  );
}

export default MenuItem;
