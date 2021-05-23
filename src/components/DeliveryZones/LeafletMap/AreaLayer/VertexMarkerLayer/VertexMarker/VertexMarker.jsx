import React from 'react';
import { CircleMarker, Popup, useMapEvents } from 'react-leaflet';
import { IconButton, Divider } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';

function VertexMarker({
  isActive,
  index,
  coordinates,
  color,
  numberVertices,

  draw,

  toggleDraw,
  saveArea,
  activatePolygon,
  rotatePolygon,
  vertexSelected,
  selectVertex,
  unselectVertex,
  updateVertex,
  removeVertex,
}) {
  useMapEvents({
    mousemove: (event) => {
      if (vertexSelected) {
        updateVertex([event.latlng.lat, event.latlng.lng]);
      }
    },
  });

  const eventHandlersdraw = {
    click(event) {
      // if first (last) vertex is clicked save and end
      if (numberVertices > 3 && (index[3] === 0 || index[3] === numberVertices - 1)) {
        saveArea();
        toggleDraw();
      }
    },
  };

  const eventHandlersActive = {
    mousedown(event) {
      //stop map dragging
      event.target._map.dragging.disable();

      //stop text/element selection
      let originalEvent = event.originalEvent;
      if (originalEvent.stopPropagation) originalEvent.stopPropagation();
      if (originalEvent.preventDefault) originalEvent.preventDefault();
      originalEvent.cancelBubble = true;
      originalEvent.returnValue = false;

      selectVertex(index);
    },

    click(event) {
      event.target._map.dragging.enable();
      event.originalEvent.view.L.DomEvent.stopPropagation(event);
      unselectVertex();
    },
  };

  const drawFromVertexHandler = (event) => {
    selectVertex(index);
    activatePolygon(index[1]);
    rotatePolygon();
    toggleDraw();
    unselectVertex();
  };

  const deleteVertexHandler = (event) => {
    selectVertex(index);
    removeVertex();
    unselectVertex();
  };

  isActive = isActive && !draw;
  let eventHandlers = isActive ? eventHandlersActive : null;
  eventHandlers = draw ? eventHandlersdraw : eventHandlers;

  return (
    <CircleMarker
      pathOptions={{
        stroke: isActive ? true : false,
        color: color,
        weight: 1,
        fillColor: isActive ? 'limegreen' : color,
        fillOpacity: 1,
        radius: 7,
      }}
      pane="popupPane"
      center={coordinates}
      eventHandlers={eventHandlers}
    >
      {isActive ? (
        <Popup>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton size="small" onClick={drawFromVertexHandler}>
              <Edit />
            </IconButton>
            <Divider orientation="vertical" flexItem style={{ margin: '6px 2px' }} />
            <IconButton size="small" onClick={deleteVertexHandler}>
              <Delete />
            </IconButton>
          </div>
        </Popup>
      ) : null}
    </CircleMarker>
  );
}

export default VertexMarker;
