import React from 'react';
import { CircleMarker, Tooltip, useMapEvents } from 'react-leaflet';

function VertexMarker({ coordinates, index, selectVertex, unselectVertex, updateVertex, vertexSelected, color }) {
  useMapEvents({
    mousemove: (event) => {
      if (vertexSelected) {
        updateVertex([event.latlng.lat, event.latlng.lng]);
      }

      // setDragging(true);
      // unselectVertex();
    },
  });

  const circleMouseClickHandler = (event) => {
    if (index === 0) {
      console.log('ENDANA');
    }
  };

  const eventHandlers = {
    mousedown(event) {
      event.target._map.dragging.disable();
      selectVertex(index);
    },
    mouseup(event) {
      event.target._map.dragging.enable();
      unselectVertex(index);
    },
  };

  return (
    <CircleMarker
      color="black"
      weight={1}
      fillColor={color}
      fillOpacity={1}
      center={coordinates}
      radius={6}
      eventHandlers={eventHandlers}
    >
      {index === 0 ? (
        <Tooltip direction="top" offset={[0, -10]} permanent>
          Schließen
        </Tooltip>
      ) : null}
    </CircleMarker>
  );
}

export default VertexMarker;
