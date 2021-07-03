import React from 'react';
import { useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';

import { Box, Divider, Grid, List, ListSubheader, Paper, makeStyles } from '@material-ui/core';
import MenuItem from './MenuItem';

const useStyles = makeStyles((theme) => ({
  list: {
    paddingBottom: 0,
  },
}));

function MenuList() {
  const classes = useStyles();
  const { menus, activeMenu } = useSelector((state) => ({
    menus: state.menus.menus.byId,
    activeMenu: state.menus.menus.activeMenu,
  }));

  let menuData = { ...menus };
  let selectedId = 0;
  if (activeMenu) {
    menuData[activeMenu.id] = activeMenu;
    selectedId = activeMenu.id;
  }

  return (
    <Paper elevation={3}>
      <List className={classes.list}>
        <ListSubheader>
          <Grid container>
            <Grid item xs={2}>
              ID
            </Grid>
            <Grid item xs={2}>
              Name
            </Grid>
            <Grid item xs={2}>
              Beschreibung
            </Grid>
            <Grid item xs={2}>
              Kategorien
            </Grid>
            <Grid item xs={2}>
              Erstellt
            </Grid>
          </Grid>
        </ListSubheader>
        <Divider className={classes.divider} />
        {Object.values(menuData).length === 0 ? (
          <Box color="text.secondary" fontStyle="italic" p={1}>
            Keine Menüs verfügbar. Bitte fügen Sie ein Menü hinzu...
          </Box>
        ) : (
          <React.Fragment>
            {Object.values(menuData).map((menu, index) => (
              <React.Fragment key={nanoid()}>
                <MenuItem menu={menu} selected={menu.id === selectedId} />
                {index + 1 < menus.length ? <Divider className={classes.divider} /> : null}
              </React.Fragment>
            ))}
          </React.Fragment>
        )}
      </List>
    </Paper>
  );
}

export default MenuList;
