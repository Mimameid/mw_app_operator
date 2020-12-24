import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { CircleMarker, Polyline, useMapEvents } from 'react-leaflet';

const MOUSE_POSITION_DELTA = 0.000025;

function LookaheadLine() {
  const activePolygon = useSelector((state) => state.deliveryZoneState.activePolygon);
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
      event.originalEvent.target.style.cursor = 'crosshair';
    },
  };

  return (
    <React.Fragment>
      {activePolygon?.coords.length > 0 ? (
        <Polyline
          dashArray={[5, 20]}
          positions={[activePolygon.coords[activePolygon.coords.length - 1], mousePosition]}
          color={activePolygon.color}
          eventHandlers={eventHandlers}
        />
      ) : null}
      <CircleMarker
        color="black"
        fillColor={activePolygon.color}
        fillOpacity={1}
        center={mousePosition}
        radius={6}
        weight={1}
        eventHandlers={eventHandlers}
        // onMouseDown={circleMouseDownHandler}
        // onClick={circleMouseClickHandler}
      />
    </React.Fragment>
  );
}

export default LookaheadLine;
