import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  saveArea,
  rotatePolygon,
  updateVertex,
  removeVertex,
  activateArea,
} from 'features/deliveryAreas/areas/actions';
import { setDraw } from 'features/mode/actions';

import { Marker, Popup } from 'react-leaflet';
import { IconButton, Divider } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { markerIcon } from 'common/constants';

function VertexMarker({ index, coordinates, numberVertices, handleRemovePolygon }) {
  const dispatch = useDispatch();
  const draw = useSelector((state) => state.mode.draw);

  const eventHandlers = {
    drag(event) {
      // if first (last) vertex is clicked save and end
      dispatch(updateVertex({ index, coords: [event.latlng.lat, event.latlng.lng] }));
    },
    dragend(event) {
      if (!draw) dispatch(saveArea());
    },
    click(event) {
      if (draw && numberVertices > 3 && (index[2] === 0 || index[2] === numberVertices - 1)) {
        dispatch(saveArea());
      }
    },
  };

  const drawFromVertexHandler = (event) => {
    dispatch(activateArea({ polygonIndex: index[0] }));
    dispatch(rotatePolygon(index));
    dispatch(setDraw(true));
  };

  const deleteVertexHandler = (event) => {
    if (numberVertices > 4) {
      dispatch(removeVertex(index));
    } else {
      handleRemovePolygon(index[0]);
    }

    dispatch(saveArea());
  };

  return (
    <Marker draggable pane="markerPane" position={coordinates} icon={markerIcon} eventHandlers={eventHandlers}>
      {draw ? null : (
        <Popup>
          <div style={{ display: 'flex', alignItems: 'center', borderRadius: '16px' }}>
            <IconButton size="small" onClick={drawFromVertexHandler}>
              <Edit />
            </IconButton>
            <Divider orientation="vertical" flexItem style={{ margin: '6px 2px' }} />
            <IconButton size="small" onClick={deleteVertexHandler}>
              <Delete />
            </IconButton>
          </div>
        </Popup>
      )}
    </Marker>
  );
}

export default React.memo(VertexMarker, (prevProps, nextProps) => {
  return (
    prevProps.index[2] === nextProps.index[2] &&
    prevProps.numberVertices === nextProps.numberVertices &&
    prevProps.coordinates[0] === nextProps.coordinates[0] &&
    prevProps.coordinates[1] === nextProps.coordinates[1]
  );
});
