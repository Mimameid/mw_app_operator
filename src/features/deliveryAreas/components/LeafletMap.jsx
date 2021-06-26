import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import LeafletPanel from 'features/deliveryAreas/components/AreasPage/LeafletMap/LeafletPanel/LeafletPanelContainer';
import AreaLayer from 'features/deliveryAreas/components/AreasPage/LeafletMap/AreaLayer/AreaLayerContainer';

function LeafletMap({ areas, drawMode, disableWidthChanged, widthChanged }) {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map && widthChanged) {
      map.invalidateSize();
    }
    disableWidthChanged();
  }, [widthChanged, disableWidthChanged, map]);

  useEffect(() => {
    if (map) {
      if (drawMode) {
        map._container.style.cursor = 'cell !important';
      } else {
        map._container.style.cursor = 'default';
      }
    }
  }, [drawMode, map]);

  const onMapCreate = (map) => {
    setMap(map);
    map.invalidateSize();
  };

  const center = areas.length < 1;

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <MapContainer
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
    </div>
  );
}

export default LeafletMap;
