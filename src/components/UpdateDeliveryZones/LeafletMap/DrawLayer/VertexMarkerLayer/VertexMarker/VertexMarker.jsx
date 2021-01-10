import React from 'react';
import { CircleMarker, useMapEvents } from 'react-leaflet';

function VertexMarker({ coordinates, index, selectVertex, unselectVertex, updateVertex, vertexSelected, color }) {
  useMapEvents({
    mousemove: (event) => {
      if (vertexSelected) {
        updateVertex([event.latlng.lat, event.latlng.lng]);
      }
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

    click(event) {
      event.target._map.dragging.enable();
      event.originalEvent.view.L.DomEvent.stopPropagation(event);
      unselectVertex();
    },
  };

  return (
    <CircleMarker
      pathOptions={{ color: 'black', weight: 1, fillColor: color, fillOpacity: 1, radius: 7 }}
      center={coordinates}
      eventHandlers={eventHandlers}
    />
  );
}

export default VertexMarker;
