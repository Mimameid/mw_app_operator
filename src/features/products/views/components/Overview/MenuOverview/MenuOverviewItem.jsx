import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activateMenu } from 'features/products/menus/actions';
import { selectItem } from 'features/products/views/slice';
import { selectHasProducts } from 'features/products/menus/slice';

import { Box, Grid, IconButton, ListItem, Switch } from '@mui/material';
import MenuModal from 'features/products/menus/components/MenuModal';
import GridItem from 'common/components/dataDisplay/GridItem';

import { DeleteForever, Edit } from '@mui/icons-material';
import AlertDialog from 'common/components/feedback/AlertDialog';

function MenuOverviewItem({ menu, selected, activeMenu, deleteHandler }) {
  const dispatch = useDispatch();
  const hasProducts = useSelector((state) => selectHasProducts(state, menu));

  const [loading, setLoading] = useState(false);
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [activateDialogOpen, setActivateDialogOpen] = useState(false);
  const [cantActivateDialogOpen, setCantActivateDialogOpen] = useState(false);
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
      activateMenu({
        menuId: menu.id,
      }),
    );
    handleRejectDialog();
  }

  const setActiveHandler = (event) => {
    setActiveRef.current = event.target.checked;
    if (!hasProducts) {
      setCantActivateDialogOpen(true);
      return;
    }

    if (!activeMenu) {
      setActivateDialogOpen(true);
      return;
    }

    setSwitchDialogOpen(true);
  };

  function handleRejectDialog(event) {
    setActivateDialogOpen(false);

    setSwitchDialogOpen(false);
    setCantActivateDialogOpen(false);
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
          {selected && !menu.isActive ? (
            <Grid sx={{ display: 'flex', alignItems: 'center' }} item xs={1}>
              <Switch
                checked={menu.isActive}
                onChange={setActiveHandler}
                color="primary"
                size="small"
                inputProps={{ 'aria-label': 'product available checkbox' }}
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
            {activeMenu?.id !== menu.id ? (
              <IconButton
                aria-label="edit"
                size="small"
                onClick={() => {
                  deleteHandler(menu);
                }}
              >
                <DeleteForever fontSize="small" color="error" />
              </IconButton>
            ) : null}
          </Box>
        </Grid>
      </ListItem>
      <AlertDialog
        open={activateDialogOpen}
        title="Menü aktivieren?"
        message="Wenn Sie das Menü aktivieren, kann, wenn ihr Shop aktiv ist, ab sofort aus diesem Menü bestellt werden. Stellen Sie bitte sicher, dass jedes Angebot des Menüs bereitgestellt werden kann."
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
        open={cantActivateDialogOpen}
        title="Menü kann nicht aktiviert werden."
        message="Dieses Menü hat noch keine Artikel. Bitte fügen Sie diesem Menü Kategorien hinzu, die Artikel enthalten."
        rejectText="OK"
        handleReject={handleRejectDialog}
        loading={loading}
        TransitionProps={{
          onExited: () => {
            setLoading(false);
          },
        }}
      />

      <AlertDialog
        open={switchDialogOpen}
        title="Angebot wechseln?"
        message="Das aktuelle Angebot wird deaktiviert. Es kann nur noch vom neuen Angebot bestellt werden. Stellen Sie bitte sicher, dass jeder Artikel des Angebots bereitgestellt werden kann."
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
