import React, { useState } from 'react';

import { CircleMarker, Polyline, useMapEvents } from 'react-leaflet';

const MOUSE_POSITION_DELTA = 0.000025;

function LookaheadLine({ selectedPolygon, color }) {
  const [mousePosition, setMousePosition] = useState([0, 0]);

  useMapEvents({
    mousemove: (event) => {
      if (
        Math.abs(mousePosition[0] - event.latlng.lat) > MOUSE_POSITION_DELTA ||
        Math.abs(mousePosition[1] - event.latlng.lng) > MOUSE_POSITION_DELTA
      ) {
        setMousePosition([event.latlng.lat, event.latlng.lng]);
      }
    },
  });

  const eventHandlers = {
    mouseover(event) {
      event.originalEvent.target.style.cursor = 'cell';
    },
  };

  return (
    <React.Fragment>
      {selectedPolygon[0].length > 1 ? (
        <React.Fragment>
          <Polyline
            dashArray={[5, 20]}
            positions={[selectedPolygon[0][selectedPolygon[0].length - 2], mousePosition]}
            pathOptions={{ color: color }}
            eventHandlers={eventHandlers}
          />
          <Polyline
            dashArray={[5, 20]}
            positions={[selectedPolygon[0][0], mousePosition]}
            pathOptions={{ color: color }}
            eventHandlers={eventHandlers}
          />
        </React.Fragment>
      ) : null}
      <CircleMarker
        pathOptions={{ color: 'black', fillColor: color, radius: 7, weight: 1 }}
        fillOpacity={1}
        center={mousePosition}
        eventHandlers={eventHandlers}
        // onMouseDown={circleMouseDownHandler}
        // onClick={circleMouseClickHandler}
      />
    </React.Fragment>
  );
}

export default LookaheadLine;
