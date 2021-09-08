import React from 'react';

import { Box } from '@material-ui/core';
import { Marker, Popup } from 'react-leaflet';
import { shopIcon } from 'common/constants';

function ShopMarker({ draw, shop }) {
  const [street, city] = shop.location.address.split(',');
  return (
    <Marker pane="markerPane" position={shop.location.coords} icon={shopIcon}>
      {!draw ? (
        <Popup>
          <Box p={0.5}>
            <Box fontSize="subtitle1.fontSize" fontWeight={700} pb={1}>
              {shop.name}
            </Box>
            <Box fontSize="subtitle2.fontSize" pb={0.1}>
              {street}
            </Box>
            <Box fontSize="subtitle2.fontSize" pb={0.1}>
              {city.trim()}
            </Box>
          </Box>
        </Popup>
      ) : null}
    </Marker>
  );
}

export default ShopMarker;
