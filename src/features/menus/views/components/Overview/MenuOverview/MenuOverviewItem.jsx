import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setActive } from 'features/menus/menus/actions';
import { selectItem } from 'features/menus/views/slice';

import { Box, Grid, IconButton, ListItem, Switch } from '@mui/material';
import MenuModal from 'features/menus/menus/components/MenuModal';
import GridItem from 'common/components/dataDisplay/GridItem';

import { DeleteForever, Edit } from '@mui/icons-material';
import AlertDialog from 'common/components/feedback/AlertDialog';

function MenuOverviewItem({ menu, selected, activeMenu, deleteHandler }) {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [activateDialogOpen, setActivateDialogOpen] = useState(false);
  const [deactivateDialogOpen, setDectivateDialogOpen] = useState(false);
  const [switchDialogOpen, setSwitchDialogOpen] = useState(false);
  const setActiveRef = useRef(null);

  function editEntryHandler(event) {
    setMenuModalOpen(true);
  }

  function handleSelectMenu(event) {
    dispatch(selectItem(menu.id));
  }

  async function handleSetActiveAcceptDialog(event) {
    setLoading(true);
    await dispatch(
      setActive({
        menuId: menu.id,
        activeMenuId: activeMenu?.id,
        isActive: setActiveRef.current,
      }),
    );
    handleRejectDialog();
  }

  const setActiveHandler = (event) => {
    setActiveRef.current = event.target.checked;

    if (activeMenu) {
      if (activeMenu.id === menu.id) {
        setDectivateDialogOpen(true);
      } else {
        setSwitchDialogOpen(true);
      }
    } else {
      setActivateDialogOpen(true);
    }
  };

  function handleRejectDialog(event) {
    setActivateDialogOpen(false);
    setDectivateDialogOpen(false);
    setSwitchDialogOpen(false);
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
                onChange={setActiveHandler}
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
            <IconButton
              aria-label="edit"
              size="small"
              onClick={() => {
                deleteHandler(menu);
              }}
            >
              <DeleteForever fontSize="small" color="error" />
            </IconButton>
          </Box>
        </Grid>
      </ListItem>
      <AlertDialog
        open={activateDialogOpen}
        title="Menü aktivieren?"
        message="Wenn Sie das Menü aktivieren, kann ab sofort aus diesem Menü bestellt werden. Stellen Sie bitte sicher, dass jede Speise des Menüs bereitgestellt werden kann."
        handleReject={handleRejectDialog}
        handleAccept={handleSetActiveAcceptDialog}
        loading={loading}
        TransitionProps={{
          onExited: () => {
            setLoading(false);
          },
        }}
      />
      <AlertDialog
        open={deactivateDialogOpen}
        title="Menü deaktivieren?"
        message="Wenn Sie das Menü deaktivieren, kann nicht mehr bestellt werden."
        handleReject={handleRejectDialog}
        handleAccept={handleSetActiveAcceptDialog}
        loading={loading}
        warning
        TransitionProps={{
          onExited: () => {
            setLoading(false);
          },
        }}
      />
      <AlertDialog
        open={switchDialogOpen}
        title="Menü wechseln?"
        message="Das aktuelle Menü wird deaktiviert. Es kann nur noch vom neuen Menü bestellt werden. Stellen Sie bitte sicher, dass jede Speise des neuen Menüs bereitgestellt werden kann."
        handleReject={handleRejectDialog}
        handleAccept={handleSetActiveAcceptDialog}
        loading={loading}
        TransitionProps={{
          onExited: () => {
            setLoading(false);
          },
        }}
      />
      <MenuModal open={menuModalOpen} onClose={() => setMenuModalOpen(false)} menu={menu} />
    </React.Fragment>
  );
}

export default React.memo(MenuOverviewItem);
