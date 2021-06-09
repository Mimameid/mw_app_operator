import React from 'react';
import { useSelector } from 'react-redux';
import { useFetchDeliveryAreas } from '../../hooks/useFetchDeliveryAreas';
import { useOnBeforeUnload } from '../../hooks/useOnBeforeUnload';

import { Grid } from '@material-ui/core';
import LeafletMap from './LeafletMap/LeafletMapContainer';

function DeliveryAreas() {
  const drawer = useSelector((state) => state.drawer);
  useFetchDeliveryAreas();
  useOnBeforeUnload(handleUnload);

  function handleUnload() {}

  return (
    <Grid
      container
      direction="column"
      alignItems="stretch"
      style={{ marginLeft: drawer.width, height: '100vh', width: `calc(100vw - ${drawer.width}px` }}
    >
      <Grid item xs={12} style={{ maxWidth: '100%' }}>
        <LeafletMap />
      </Grid>
    </Grid>
  );
}

export default DeliveryAreas;
