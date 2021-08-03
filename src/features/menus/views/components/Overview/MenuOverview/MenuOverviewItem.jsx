import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteMenu } from 'features/menus/menus/actions';
import { selectItem } from 'features/menus/views/viewsSlice';

import { Grid, IconButton, ListItem, makeStyles } from '@material-ui/core';
import WarningDialog from 'common/components/dialogs/WarningDialog';
import MenuModal from 'features/menus/menus/components/MenuModal';
import TruncatedGridItem from 'common/components/other/TruncatedGridItem';
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
  wrap: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '&:hover': {
      overflow: 'visible',
      whiteSpace: 'normal',
    },
  },
}));

function MenuOverviewItem({ menu, selected }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [menuModalOpen, setMenuModalOpen] = useState(false);

  function editEntryHandler(event) {
    setMenuModalOpen(true);
  }

  function handleSelectMenu(event) {
    dispatch(selectItem(menu.id));
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
          <TruncatedGridItem item xs={2}>
            {menu.id}
          </TruncatedGridItem>
          <TruncatedGridItem item xs={2}>
            {menu.name}
          </TruncatedGridItem>
          <TruncatedGridItem item xs={2}>
            {menu.desc}
          </TruncatedGridItem>
          <TruncatedGridItem item xs={2}>
            {menu.categories.length}
          </TruncatedGridItem>
          <TruncatedGridItem item xs={2}>
            {new Date(menu.created).toLocaleDateString('DE-de')}
          </TruncatedGridItem>
          <Grid className={selected ? null : classes.hidden} item xs={2}>
            <IconButton aria-label="edit" size="small" onClick={editEntryHandler}>
              <Edit fontSize="small" />
            </IconButton>
            <IconButton aria-label="edit" size="small" onClick={deleteEntryHandler}>
              <DeleteForever fontSize="small" color="error" />
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
      <MenuModal open={menuModalOpen} onClose={() => setMenuModalOpen(false)} menu={menu} />
    </React.Fragment>
  );
}

export default MenuOverviewItem;
