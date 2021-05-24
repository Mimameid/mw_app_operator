import React, { useState, useRef } from 'react';
import { Polygon, useMapEvents } from 'react-leaflet';

import ActiveAreaLayer from './ActiveAreaLayer/ActiveAreaLayerContainer';
import CustomDialog from '../../../common/CustomDialog/CustomDialog';
import useDispatchAreaEdited from '../../../../hooks/useDispatchAreaEdited';

function AreaLayer({
  draw,
  areas,
  edited,
  activeArea,
  vertexSelected,

  addVertex,
  unselectVertex,
  activateArea,
  deactivateArea,
  activatePolygon,
}) {
  useDispatchAreaEdited(areas, activeArea);
  const [dialogOpen, setDialogOpen] = useState(false);
  const areaNumberRef = useRef(null);

  useMapEvents({
    click: (event) => {
      if (draw) {
        if (!vertexSelected) {
          const point = [event.latlng.lat, event.latlng.lng];
          addVertex(point);
        }
      } else {
        if (activeArea && !edited) {
          deactivateArea();
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
      if (activeArea.areaNumber !== event.target.options.areaNumber) {
        event.sourceTarget._path.attributes[1].value = 'limegreen';
      }
    },
    mouseout(event) {
      if (activeArea.areaNumber !== event.target.options.areaNumber) {
        event.sourceTarget._path.attributes[1].value = event.sourceTarget.options.color;
      }
    },
    mousedown(event) {
      if (activeArea.areaNumber !== event.target.options.areaNumber) {
        areaNumberRef.current = event.target.options;
        if (edited) {
          setDialogOpen(true);
        } else {
          activateArea(areaNumberRef.current.areaNumber);
          activatePolygon(areaNumberRef.current.polygonIndex);
        }
      }
    },
  };

  const handleRejectDialog = (event) => {
    setDialogOpen(false);
  };

  const handleAcceptDialog = (event) => {
    activateArea(areaNumberRef.current.areaNumber);
    activatePolygon(areaNumberRef.current.polygonIndex);
    setDialogOpen(false);
  };

  return (
    <React.Fragment>
      {areas.map((area, areaIndex) =>
        area.areaPolygons.map((polygon, polygonIndex) =>
          area.areaNumber !== activeArea.areaNumber ? (
            <Polygon
              // className={!draw ? classes.polygon : classes.polygondraw}
              key={`${(area.areaNumber + 1) * polygonIndex + new Date().getTime()}`}
              positions={polygon}
              pathOptions={{ color: area.color }}
              eventHandlers={!draw ? eventHandlers : null}
              areaNumber={area.areaNumber}
              polygonIndex={polygonIndex}
            ></Polygon>
          ) : null,
        ),
      )}
      <ActiveAreaLayer />
      <CustomDialog
        open={dialogOpen}
        title="Zone wechseln?"
        message="Die aktuelle Zone wurde nicht gespeichert. Wenn Sie die Zone wechseln, werden alle Veränderungen
        unwiederruflich gelöscht."
        handleReject={handleRejectDialog}
        handleAccept={handleAcceptDialog}
      />
    </React.Fragment>
  );
}

export default AreaLayer;
