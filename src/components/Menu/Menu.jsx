import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAuthenticate } from '../../hooks/useAuthenticate';

import { Grid, Divider } from '@material-ui/core';
import MenuTitle from './MenuTitle/MenuTitle';

function Menu() {
  useAuthenticate();
  const drawerState = useSelector((state) => state.drawerState);

  useEffect(() => {});

  return (
    <Grid
      container
      direction="column"
      style={{
        backgroundColor: 'white',
        marginLeft: drawerState.width + 'px',
        height: '100vh',
        width: `calc(100vw - ${drawerState.width}px`,
      }}
    >
      <MenuTitle />
      <Divider style={{ margin: '0 12px' }} />
      <Grid item>Menüs</Grid>
      <Grid item>Menüs</Grid>
    </Grid>
  );
}

export default Menu;
