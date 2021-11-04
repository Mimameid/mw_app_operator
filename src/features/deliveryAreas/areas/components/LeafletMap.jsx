import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Box, Paper } from '@mui/material';
import { MapContainer, TileLayer } from 'react-leaflet';
import LeafletPanel from './LeafletPanel/LeafletPanel';
import AreaLayer from './AreaLayer/AreaLayer';
import ShopMarker from './ShopMarker';

function LeafletMap() {
  const { draw, shop } = useSelector((state) => ({
    draw: state.mode.draw,
    shop: state.shop.shop,
  }));
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map) {
      if (draw) {
        map._container.style.cursor = 'cell !important';
      } else {
        map._container.style.cursor = 'default';
      }
    }
  }, [draw, map]);

  const onMapCreate = (map) => {
    setMap(map);
    map.invalidateSize();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper
        sx={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}
        variant="elevation"
        elevation={3}
      >
        <MapContainer
          style={{ width: '100%', height: '100%' }}
          center={[shop.location.coords.lat, shop.location.coords.lon]}
          zoom={11}
          doubleClickZoom={false}
          zoomControl={true}
          whenCreated={onMapCreate}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ShopMarker draw={draw} shop={shop} />
          <LeafletPanel />
          <AreaLayer />
        </MapContainer>
      </Paper>
    </Box>
  );
}

export default LeafletMap;
