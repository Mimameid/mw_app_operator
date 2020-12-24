import React from 'react';
import { Polygon, LayerGroup, useMapEvents } from 'react-leaflet';

import LookaheadLine from './LookaheadLine/LookaheadLine';

function PolygonLayer({ addPoint, unselectVertex, deliveryZoneState }) {
  const activePolygon = deliveryZoneState.activePolygon;
  const polygons = deliveryZoneState.polygons;

  useMapEvents({
    click: (event) => {
      if (deliveryZoneState.drawmode) {
        if (!deliveryZoneState.vertexSelected) {
          const point = [event.latlng.lat, event.latlng.lng];
          addPoint(point);
        }
      }
      // setDragging(true);
      // unselectVertex();
      console.log(deliveryZoneState.activePolygon?.coords.length);
    },
  });

  const polygonOnHover = (event) => {
    event.originalEvent.target.style.cursor = 'crosshair';
  };

  return activePolygon ? (
    <LayerGroup>
      <Polygon positions={activePolygon.coords} onMouseOver={polygonOnHover} color={activePolygon.color} />

      {polygons.map((polygon, index) =>
        polygon.polygonNumber !== activePolygon.polygonNumber ? (
          <Polygon key={index} positions={polygon.coords} color={polygon.color} />
        ) : null,
      )}
      <LookaheadLine />
    </LayerGroup>
  ) : null;
}

export default PolygonLayer;
