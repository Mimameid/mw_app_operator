import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteMenu, setActive } from 'features/menus/menus/actions';
import { selectItem } from 'features/menus/views/slice';

import { Box, Grid, IconButton, ListItem, Switch } from '@mui/material';
import WarningDialog from 'common/components/feedback/WarningDialog';
import MenuModal from 'features/menus/menus/components/MenuModal';
import GridItem from 'common/components/dataDisplay/GridItem';
import { DeleteForever, Edit } from '@mui/icons-material';
import CustomDialog from 'common/components/feedback/CustomDialog';

function MenuOverviewItem({ menu, selected, activeMenu }) {
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

  async function handleAcceptDialog(event) {
    await dispatch(deleteMenu(menu.id));
    setDialogOpen(false);
  }

  function handleSwitchAcceptDialog(event) {
    dispatch(setActive({ menuId: menu.id, activeMenuId: activeMenu?.id, isActive: ref.current }));
    setDialogOpen(false);
    setActivateDialogOpen(false);
    setDectivateDialogOpen(false);
    setSwitchDialogOpen(false);
  }

  function handleToggleSetActive(event) {
    ref.current = event.target.checked;

    if (activeMenu) {
      if (menu.id === activeMenu.id) {
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
        sx={{ px: 2, py: 1, bgcolor: (theme) => (selected ? theme.palette.primary.light + '33' : null) }}
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
            <Grid sx={{ display: 'flex', alignItems: 'center' }} item xs={1}>
              <Switch
                checked={menu.isActive}
                onChange={handleToggleSetActive}
                color="primary"
                size="small"
                inputProps={{ 'aria-label': 'dish available checkbox' }}
              />
            </Grid>
          ) : (
            <GridItem
              sx={{
                color: menu.id === activeMenu?.id ? 'success.main' : 'grey.500',
                fontStyle: 'italic',
              }}
              item
              xs={1}
            >
              {menu.id === activeMenu?.id ? 'aktiv' : 'inaktiv'}
            </GridItem>
          )}

          <Box
            sx={{ visibility: selected ? 'visible' : 'hidden' }}
            display="flex"
            flexGrow={1}
            justifyContent="flex-end"
          >
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
        message={
          menu.isActive
            ? 'Bitte deaktivieren Sie das Menü, um es löschen zu können.'
            : 'Dieser Vorgang kann nicht rückgängig gemacht werden.'
        }
        handleReject={handleRejectDialog}
        handleAccept={handleAcceptDialog}
        disabled={menu.isActive}
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
