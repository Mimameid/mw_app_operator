import React from 'react';

import { Polygon, Polyline } from 'react-leaflet';
import LookaheadLine from './LookaheadLine/LookaheadLine';
import VertexMarkerLayer from '../VertexMarkerLayer/VertexMarkerLayer';

function ActiveAreaLayer({ drawMode, activeArea }) {
  return (
    <React.Fragment>
      {drawMode ? (
        <React.Fragment>
          {activeArea.areaPolygons.map((polygon, polygonIndex) =>
            polygonIndex === activeArea.selectedPolygonIndex ? (
              <Polyline
                key={`${(activeArea.areaNumber + 1) * polygonIndex + new Date().getTime()}`}
                positions={[polygon[0].slice(0, -1)]}
                pathOptions={{ color: activeArea.color }}
                areaNumber={activeArea.areaNumber}
                polygonIndex={polygonIndex}
                pane="shadowPane"
              />
            ) : (
              <Polygon
                key={`${(activeArea.areaNumber + 1) * polygonIndex + new Date().getTime()}`}
                positions={polygon}
                pathOptions={{ color: activeArea.color }}
                pane="shadowPane"
              />
            ),
          )}
          )
          <LookaheadLine
            selectedPolygon={activeArea.areaPolygons[activeArea.selectedPolygonIndex]}
            color={activeArea.color}
          />
        </React.Fragment>
      ) : (
        <Polygon
          key={`${activeArea.areaNumber + new Date().getTime()}`}
          positions={activeArea.areaPolygons}
          pathOptions={{ color: activeArea.color }}
          pane="shadowPane"
        />
      )}

      <VertexMarkerLayer
        areaPolygons={activeArea.areaPolygons}
        areaNumber={activeArea.areaNumber}
        color={activeArea.color}
        isActive={true}
      />
    </React.Fragment>
  );
}

export default ActiveAreaLayer;
