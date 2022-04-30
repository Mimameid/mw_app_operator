import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteMenu } from 'features/products/menus/actions';
import { selectActiveMenu } from 'features/products/menus/slice';

import { Box, Divider, Grid, List, ListSubheader } from '@mui/material';
import MenuOverviewItem from './MenuOverviewItem';
import AlertDialog from 'common/components/feedback/AlertDialog';
import GridHeaderItem from 'common/components/dataDisplay/GridHeaderItem';
import EmptyView from '../../ItemView/EmptyView';

function MenuOverview() {
  const dispatch = useDispatch();
  const menusArray = useSelector((state) => {
    let menusArray = Object.values(state.menus.menus.byId);
    menusArray.sort((a, b) => a.name.localeCompare(b.name));
    return menusArray;
  });

  const activeMenu = useSelector(selectActiveMenu);
  const selectedMenuId = useSelector((state) => state.menus.views.itemId);
  const selectedMenu = useSelector((state) => state.menus.menus.byId[selectedMenuId]);

  const [loading, setLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const deleteHandler = useCallback((menu) => {
    setDeleteDialogOpen(true);
  }, []);

  function handleRejectDialog(event) {
    setDeleteDialogOpen(false);
  }

  async function handleDeleteAcceptDialog(event) {
    setLoading(true);
    await dispatch(deleteMenu(selectedMenuId));
    setDeleteDialogOpen(false);
  }

  return (
    <List sx={{ p: 0 }}>
      <ListSubheader
        sx={{
          color: 'common.white',
          bgcolor: 'primary.main',

          borderBottom: (theme) => '1px solid ' + theme.palette.primary.main,
          boxShadow: (theme) => theme.shadows[3],
        }}
      >
        <Grid container>
          <GridHeaderItem item xs={1}>
            ID
          </GridHeaderItem>
          <GridHeaderItem item xs={2}>
            Name
          </GridHeaderItem>
          <GridHeaderItem item xs={2}>
            Beschreibung
          </GridHeaderItem>
          <GridHeaderItem item xs={2}>
            Kategorie
          </GridHeaderItem>
          <GridHeaderItem item xs={2}>
            Erstellt
          </GridHeaderItem>
          <GridHeaderItem item xs={1}>
            Aktiv
          </GridHeaderItem>
        </Grid>
      </ListSubheader>
      <Divider />
      <Box sx={{ overflow: 'auto', height: '234px' }}>
        {menusArray.length === 0 ? (
          <EmptyView>Kein Menü verfügbar. Bitte erstellen Sie ein Menü...</EmptyView>
        ) : (
          menusArray.map((menu, index) => (
            <React.Fragment key={menu.id}>
              <MenuOverviewItem
                menu={menu}
                selected={menu.id === selectedMenuId}
                activeMenu={activeMenu}
                deleteHandler={deleteHandler}
              />
              {menusArray.length >= 5 && index === menusArray.length - 1 ? null : <Divider />}
            </React.Fragment>
          ))
        )}
      </Box>
      <AlertDialog
        open={deleteDialogOpen}
        title="Angebot löschen?"
        message={
          selectedMenu && selectedMenu.isActive
            ? 'Bitte deaktivieren Sie das Angebot, um es löschen zu können.'
            : 'Dieser Vorgang kann nicht rückgängig gemacht werden.'
        }
        handleReject={handleRejectDialog}
        handleAccept={handleDeleteAcceptDialog}
        disabled={selectedMenu ? selectedMenu.isActive : false}
        loading={loading}
        warning
        TransitionProps={{
          onExited: () => {
            setLoading(false);
          },
        }}
      />
    </List>
  );
}

export default MenuOverview;
