import React from 'react';
import { useSelector } from 'react-redux';
import { useAuthenticate } from '../../hooks/useAuthenticate';

import { Grid } from '@material-ui/core';
import LeafletMap from './LeafletMap/LeafletMapContainer';

function DeliveryZones() {
  useAuthenticate();
  const drawerState = useSelector((state) => state.drawerState);

  return (
    <Grid
      container
      direction="column"
      alignItems="stretch"
      style={{ marginLeft: drawerState.width, height: '100vh', width: `calc(100vw - ${drawerState.width}px` }}
    >
      <Grid item xs={12} style={{ maxWidth: '100%' }}>
        <LeafletMap />
      </Grid>
    </Grid>
  );
}

export default DeliveryZones;
