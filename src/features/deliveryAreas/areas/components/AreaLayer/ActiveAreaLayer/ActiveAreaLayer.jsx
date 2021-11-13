import React, { useRef, useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import { useDispatch } from 'react-redux';
import { deactivateArea, removeArea, removePolygon } from '../../../actions';

import PolygonWrapper from './PolygonWrapper/PolygonWrapper';
import LookaheadLine from './LookaheadLine';
import AlertDialog from 'common/components/feedback/AlertDialog';

function ActiveAreaLayer({ activeArea, draw }) {
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);
  const mouseRef = useRef([0, 0]);
  const polygonIndexRef = useRef(-1);

  useMapEvents({
    mousemove: (event) => {
      mouseRef.current = [event.latlng.lat, event.latlng.lng];
    },
  });

  const handleRemovePolygon = (polygonIndex) => {
    polygonIndexRef.current = polygonIndex;
    setDialogOpen(true);
  };

  const handleRejectDialog = (event) => {
    setDialogOpen(false);
  };

  const handleAcceptDialog = (event) => {
    if (activeArea.areaPolygons.length > 1) {
      dispatch(removePolygon(polygonIndexRef.current));
    } else {
      dispatch(deactivateArea());
      dispatch(removeArea(activeArea.areaNumber));
    }

    setDialogOpen(false);
  };

  return (
    <React.Fragment>
      {activeArea.areaPolygons.map((polygon, polygonIndex) => (
        <PolygonWrapper
          key={polygonIndex}
          polygon={polygon}
          polygonIndex={polygonIndex}
          selectedPolygonIndex={activeArea.selectedPolygonIndex}
          color={activeArea.color}
          handleRemovePolygon={handleRemovePolygon}
        />
      ))}
      {draw ? (
        <LookaheadLine
          selectedPolygon={activeArea.areaPolygons[activeArea.selectedPolygonIndex]}
          initialMousePosition={mouseRef.current}
          color={activeArea.color}
        />
      ) : null}
      <AlertDialog
        open={dialogOpen}
        handleReject={handleRejectDialog}
        handleAccept={handleAcceptDialog}
        title="Gebiet löschen?"
        message="Dieser Vorgang würde das Gebiet löschen, wollen Sie forfahren?"
      />
    </React.Fragment>
  );
}

export default ActiveAreaLayer;
