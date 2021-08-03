import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Paper, makeStyles } from '@material-ui/core';
import { MapContainer, TileLayer } from 'react-leaflet';
import LeafletPanel from './LeafletPanel/LeafletPanel';
import AreaLayer from './AreaLayer/AreaLayerContainer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  mapContainer: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },
}));

function LeafletMap() {
  const classes = useStyles();
  const draw = useSelector((state) => state.deliveryAreas.mode.draw);
  const areas = useSelector((state) => state.deliveryAreas.areaData.areas);

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

  const center = areas.length < 1;

  return (
    <div className={classes.root}>
      <Paper className={classes.mapContainer} variant="elevation" elevation={3}>
        <MapContainer
          className={classes.map}
          center={center ? [50.8, 8.77] : areas[0].areaPolygons[0][0][0]}
          zoom={center ? 6 : 10}
          style={{ height: '100%', width: '100%' }}
          doubleClickZoom={false}
          zoomControl={true}
          whenCreated={onMapCreate}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          <LeafletPanel />
          <AreaLayer />
        </MapContainer>
      </Paper>
    </div>
  );
}

export default LeafletMap;
