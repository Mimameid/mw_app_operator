import React, { useState } from 'react';

import { CircleMarker, Polyline, Tooltip, useMapEvents } from 'react-leaflet';

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

  let tooltipText = 'Zum Schließen ersten Marker klicken';
  if (selectedPolygon[0].length === 0) {
    tooltipText = 'Zum Starten auf der Karte klicken';
  } else if (selectedPolygon[0].length < 4) {
    tooltipText = 'Klicken, um weiterzuzeichnen';
  }
  return (
    <React.Fragment>
      {selectedPolygon[0].length > 1 ? (
        <React.Fragment>
          <Polyline
            dashArray={[5, 20]}
            positions={[selectedPolygon[0][selectedPolygon[0].length - 2], mousePosition]}
            pathOptions={{ color: color }}
            eventHandlers={eventHandlers}
            pane="markerPane"
          />
        </React.Fragment>
      ) : null}
      <CircleMarker
        pathOptions={{ color: 'black', fillColor: color, radius: 7, weight: 1 }}
        fillOpacity={1}
        center={mousePosition}
        eventHandlers={eventHandlers}
        pane="markerPane"
      >
        <Tooltip direction={'bottom'} opacity={0.9} offset={[0, 10]} permanent>
          {tooltipText}
        </Tooltip>
      </CircleMarker>
    </React.Fragment>
  );
}

export default LookaheadLine;
