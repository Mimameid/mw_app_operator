import React from 'react';

import VertexMarker from './VertexMarker/VertexMarkerContainer';

export default function VertexMarkerLayer({ areaPolygons, color }) {
  let vertexMarkers = [];

  areaPolygons.forEach((polygon, polygonIndex) => {
    polygon.forEach((linearRing, ringIndex) => {
      linearRing.forEach((point, pointIndex) => {
        vertexMarkers.push(
          <VertexMarker
            key={`${point[0]} + ${pointIndex + 1}`}
            index={[polygonIndex, ringIndex, pointIndex]}
            coordinates={point}
            color={color}
          />,
        );
      });
    });
  });

  return <React.Fragment>{vertexMarkers}</React.Fragment>;
}
