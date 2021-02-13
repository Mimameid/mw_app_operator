import React from 'react';

import VertexMarker from './VertexMarker/VertexMarkerContainer';

export default function VertexMarkerLayer({ areaPolygons, areaNumber, color, isActive }) {
  let vertexMarkers = [];

  areaPolygons.forEach((polygon, polygonIndex) => {
    polygon.forEach((linearRing, ringIndex) => {
      linearRing.forEach((point, pointIndex) => {
        vertexMarkers.push(
          <VertexMarker
            key={`${point[0]} + ${pointIndex + 1} + ${new Date().getTime()}`}
            index={[areaNumber, polygonIndex, ringIndex, pointIndex]}
            coordinates={point}
            color={color}
            numberVertices={linearRing.length}
            isActive={isActive ? true : false}
          />,
        );
      });
    });
  });

  return <React.Fragment>{vertexMarkers}</React.Fragment>;
}
