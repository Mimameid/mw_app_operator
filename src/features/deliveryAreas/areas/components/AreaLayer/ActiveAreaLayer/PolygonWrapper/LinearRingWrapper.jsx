import React from 'react';
import { useSelector } from 'react-redux';

import { Polygon, Polyline } from 'react-leaflet';
import VertexMarker from './VertexMarker';

function LinearRingWrapper({ linearRing, color, polygonIndex, selectedPolygonIndex, ringIndex, ...props }) {
  const draw = useSelector((state) => state.mode.draw);

  return (
    <React.Fragment>
      {draw && selectedPolygonIndex === polygonIndex ? (
        <Polyline positions={[linearRing.slice(0, -1)]} pathOptions={{ color }} pane="shadowPane" />
      ) : (
        <Polygon positions={linearRing} pathOptions={{ color }} pane="shadowPane" />
      )}

      {linearRing.slice(0, -1).map((point, pointIndex) => (
        <VertexMarker
          key={pointIndex}
          coordinates={point}
          numberVertices={linearRing.length}
          index={[polygonIndex, ringIndex, pointIndex]}
          {...props}
        />
      ))}
    </React.Fragment>
  );
}

export default React.memo(LinearRingWrapper);
