import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import LeafletUI from './LeafletUI/LeafletUIContainer';
import PolygonLayer from './PolygonLayer/PolygonLayerContainer';
import VertexMarkerLayer from './VertexMarkerLayer/VertexMarkerLayer';

function LeafletMap({ disableWidthChanged, deliveryZoneState, widthChanged }) {
  const [dragging, setDragging] = useState(true);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map && widthChanged) {
      map.invalidateSize();
    }
    disableWidthChanged();
  }, [widthChanged]);

  const onMapCreate = (map) => {
    setMap(map);
    map.invalidateSize();
  };

  const mouseDownHandler = (event) => {
    if (deliveryZoneState.vertexSelected) {
      setDragging(false);
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <MapContainer
        center={[50.8, 8.77]}
        zoom={14}
        style={{ height: '100%', width: '100%' }}
        doubleClickZoom={false}
        zoomControl={false}
        onMouseDown={mouseDownHandler}
        dragging={dragging}
        whenCreated={onMapCreate}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <VertexMarkerLayer />
        <PolygonLayer />

        <LeafletUI />
      </MapContainer>
    </div>
  );
}

export default LeafletMap;
