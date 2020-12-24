import React from 'react';
import { useSelector } from 'react-redux';

import VertexMarker from './VertexMarker/VertexMarkerContainer';

export default function VertexMarkerLayer() {
  let vertexMarkers = null;
  const activePolygon = useSelector((state) => state.deliveryZoneState.activePolygon);

  if (activePolygon) {
    vertexMarkers = activePolygon.coords.map((coordinates, index) => (
      <VertexMarker key={index} index={index} coordinates={coordinates} color={activePolygon.color} />
    ));
  }

  return <React.Fragment>{vertexMarkers}</React.Fragment>;
}
