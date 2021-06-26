import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDeliveryAreas } from 'store/userState/deliveryAreas/actions';
import { useOnBeforeUnload } from 'common/hooks/useOnBeforeUnload';

import { Grid } from '@material-ui/core';
import LeafletMap from 'features/deliveryAreas/components/LeafletMapContainer';

function DeliveryAreas() {
  const dispatch = useDispatch();
  const drawer = useSelector((state) => state.drawer);
  useOnBeforeUnload();

  useEffect(() => {
    dispatch(fetchDeliveryAreas());
  }, [dispatch]);

  return (
    <Grid
      container
      direction="column"
      alignItems="stretch"
      style={{
        marginLeft: drawer.width + 'px',
        height: '100vh',
        width: `calc(100vw - ${drawer.width}px`,
      }}
    >
      <Grid item xs={12} style={{ maxWidth: '100%' }}>
        <LeafletMap />
      </Grid>
    </Grid>
  );
}

export default DeliveryAreas;
