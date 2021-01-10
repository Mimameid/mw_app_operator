import React from 'react';
import { Polygon, useMapEvents } from 'react-leaflet';

import VertexMarkerLayer from './VertexMarkerLayer/VertexMarkerLayer';
import LookaheadLine from './LookaheadLine/LookaheadLine';

function DrawLayer({
  drawMode,
  selectMode,
  areas,
  areaNumber,
  areaPolygons,
  selectedPolygonIndex,
  color,
  vertexSelected,

  toggleDrawMode,
  toggleSelectMode,
  addPoint,
  unselectVertex,
  activateArea,
  activatePolygon,
}) {
  useMapEvents({
    click: (event) => {
      if (drawMode) {
        if (!vertexSelected) {
          const point = [event.latlng.lat, event.latlng.lng];
          addPoint(point);
        }
      }
      unselectVertex();
    },
    mouseup: (event) => {
      event.target.dragging.enable();
      unselectVertex();
    },
  });

  const eventHandlers = {
    mouseover(event) {
      if (selectMode) {
        event.sourceTarget._path.attributes[1].value = 'limegreen';
      }
    },
    mouseout(event) {
      if (selectMode) {
        event.sourceTarget._path.attributes[1].value = event.sourceTarget.options.color;
      }
    },
    mousedown(event) {
      if (selectMode) {
        toggleSelectMode();
        activateArea(event.target.options.areaNumber);
        activatePolygon(event.target.options.polygonIndex);
        toggleDrawMode();
      }
    },
  };

  return (
    <React.Fragment>
      {areas.map((area, areaIndex) =>
        area.areaNumber !== areaNumber
          ? area.areaPolygons.map((polygon, polygonIndex) => {
              return (
                <Polygon
                  key={area.areaNumber * (polygonIndex + 1)}
                  positions={polygon}
                  pathOptions={{ color: area.color }}
                  eventHandlers={eventHandlers}
                  areaNumber={area.areaNumber}
                  polygonIndex={polygonIndex}
                />
              );
            })
          : null,
      )}
      {drawMode ? (
        <React.Fragment>
          {areaPolygons.map((polygon, polygonIndex) => {
            return (
              <Polygon
                key={areaNumber * (polygonIndex + 1)}
                positions={[polygon]}
                pathOptions={{ color: color }}
                eventHandlers={eventHandlers}
                areaNumber={areaNumber}
                polygonIndex={polygonIndex}
              />
            );
          })}
          <LookaheadLine selectedPolygon={areaPolygons[selectedPolygonIndex]} color={color} />
          <VertexMarkerLayer areaPolygons={areaPolygons} color={color} />
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
}

export default DrawLayer;
