import React from 'react';

import { Box } from '@mui/material';
import { Marker, Popup } from 'react-leaflet';
import { shopIcon } from 'common/constants';

function ShopMarker({ draw, shop, shopLocation }) {
  const { street, streetNumber, postCode, city } = shop.location;
  return (
    <Marker pane="markerPane" position={shopLocation} icon={shopIcon}>
      {!draw ? (
        <Popup>
          <Box p={0.5}>
            <Box fontSize="subtitle1.fontSize" fontWeight={700} pb={1}>
              {shop.name}
            </Box>
            <Box fontSize="subtitle2.fontSize" pb={0.1}>
              {street} {streetNumber}
            </Box>
            <Box fontSize="subtitle2.fontSize" pb={0.1}>
              {postCode} {city}
            </Box>
          </Box>
        </Popup>
      ) : null}
    </Marker>
  );
}

export default ShopMarker;
