import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteMenu, activateMenu } from 'features/menus/menus/actions';
import { selectItem } from 'features/menus/views/slice';

import { Box, Grid, IconButton, ListItem, makeStyles, Switch } from '@material-ui/core';
import WarningDialog from 'common/components/dialogs/WarningDialog';
import MenuModal from 'features/menus/menus/components/MenuModal';
import GridItem from 'common/components/other/GridItem';
import { DeleteForever, Edit } from '@material-ui/icons';
import CustomDialog from 'common/components/dialogs/CustomDialog';

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

function MenuOverviewItem({ menu, selected, activeMenuId }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activateDialogOpen, setActivateDialogOpen] = useState(false);
  const [deactivateDialogOpen, setDectivateDialogOpen] = useState(false);
  const [switchDialogOpen, setSwitchDialogOpen] = useState(false);
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const ref = useRef(false);

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
    setActivateDialogOpen(false);
    setDectivateDialogOpen(false);
    setSwitchDialogOpen(false);
  }

  function handleAcceptDialog(event) {
    dispatch(deleteMenu(menu.id));
    setDialogOpen(false);
  }

  function handleSwitchAcceptDialog(event) {
    dispatch(activateMenu({ menuId: menu.id, activeMenuId, isActive: ref.current }));
    setDialogOpen(false);
  }

  function handleToggleActivateMenu(event) {
    ref.current = event.target.checked;
    if (activeMenuId) {
      if (menu.id === activeMenuId) {
        setDectivateDialogOpen(true);
      } else {
        setSwitchDialogOpen(true);
      }
    } else {
      setActivateDialogOpen(true);
    }
  }

  return (
    <React.Fragment>
      <ListItem
        className={selected ? classes.highlight : null}
        button={!selected}
        onClick={!selected ? handleSelectMenu : null}
      >
        <Grid container>
          <GridItem item xs={1}>
            {menu.id}
          </GridItem>
          <GridItem item xs={2}>
            {menu.name}
          </GridItem>
          <GridItem item xs={2}>
            {menu.desc}
          </GridItem>
          <GridItem item xs={2}>
            {menu.categories.length}
          </GridItem>
          <GridItem item xs={2}>
            {new Date(menu.created).toLocaleDateString('DE-de')}
          </GridItem>
          {selected ? (
            <Grid item xs={1}>
              <Switch
                checked={menu.isActive}
                onChange={handleToggleActivateMenu}
                color="primary"
                size="small"
                inputProps={{ 'aria-label': 'dish available checkbox' }}
              />
            </Grid>
          ) : menu.id === activeMenuId ? (
            <GridItem color={'success.main'} fontStyle={'italic'} item xs={1}>
              aktiv
            </GridItem>
          ) : null}

          <Box className={selected ? null : classes.hidden} display="flex" flexGrow={1} justifyContent="flex-end">
            <IconButton aria-label="edit" size="small" onClick={editEntryHandler}>
              <Edit fontSize="small" />
            </IconButton>
            <IconButton aria-label="edit" size="small" onClick={deleteEntryHandler}>
              <DeleteForever fontSize="small" color="error" />
            </IconButton>
          </Box>
        </Grid>
      </ListItem>
      <WarningDialog
        open={dialogOpen}
        title="Menü löschen?"
        message="Dieser Vorgang kann nicht rückgängig gemacht werden."
        handleReject={handleRejectDialog}
        handleAccept={handleAcceptDialog}
        warning
      />
      <CustomDialog
        open={activateDialogOpen}
        title="Menü aktivieren?"
        message="Wenn Sie das Menü aktivieren, kann ab sofort aus diesem Menü bestellt werden. Stellen Sie bitte sicher, dass jede Speise des Menüs bereitgestellt werden kann."
        handleReject={handleRejectDialog}
        handleAccept={handleSwitchAcceptDialog}
      />
      <WarningDialog
        open={deactivateDialogOpen}
        title="Menü deaktivieren?"
        message="Wenn Sie das Menü deaktivieren, kann nicht mehr bestellt werden."
        handleReject={handleRejectDialog}
        handleAccept={handleSwitchAcceptDialog}
        warning
      />
      <CustomDialog
        open={switchDialogOpen}
        title="Menü wechseln?"
        message="Das aktuelle Menü wird deaktiviert. Es kann nur noch vom neuen Menü bestellt werden. Stellen Sie bitte sicher, dass jede Speise des neuen Menüs bereitgestellt werden kann."
        handleReject={handleRejectDialog}
        handleAccept={handleSwitchAcceptDialog}
      />
      <MenuModal open={menuModalOpen} onClose={() => setMenuModalOpen(false)} menu={menu} />
    </React.Fragment>
  );
}

export default MenuOverviewItem;
