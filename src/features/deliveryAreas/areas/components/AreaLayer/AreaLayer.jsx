import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addVertex, activateArea, deactivateArea } from 'features/deliveryAreas/areas/actions';

import { Polygon, useMapEvents } from 'react-leaflet';
import ActiveAreaLayer from './ActiveAreaLayer/ActiveAreaLayer';
import useDispatchAreaEdited from 'features/deliveryAreas/hooks/useDispatchAreaEdited';

function AreaLayer() {
  const dispatch = useDispatch();
  const { draw, areas, activeArea } = useSelector((state) => ({
    draw: state.mode.draw,

    areas: state.deliveryAreas.areas.areas,
    activeArea: state.deliveryAreas.areas.activeArea,
  }));
  useDispatchAreaEdited(areas, activeArea);
  const areaNumberRef = useRef(null);
  useMapEvents({
    click: (event) => {
      if (draw) {
        const point = [event.latlng.lat, event.latlng.lng];
        dispatch(addVertex(point));
      } else {
        if (activeArea) {
          dispatch(deactivateArea());
        }
      }
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
        dispatch(
          activateArea({
            areaNumber: areaNumberRef.current.areaNumber,
            polygonIndex: areaNumberRef.current.polygonIndex,
          }),
        );
      }
    },
  };

  return (
    <React.Fragment>
      {areas.map((area, areaIndex) =>
        area.areaPolygons.map((polygon, polygonIndex) =>
          area.areaNumber !== activeArea.areaNumber ? (
            <Polygon
              key={`${(area.areaNumber + 1) * polygonIndex + new Date().getTime()}`}
              positions={polygon}
              pathOptions={{ color: area.color }}
              eventHandlers={!draw ? eventHandlers : null}
              areaNumber={area.areaNumber}
              polygonIndex={polygonIndex}
            />
          ) : null,
        ),
      )}
      <ActiveAreaLayer activeArea={activeArea} draw={draw} />
    </React.Fragment>
  );
}

export default AreaLayer;
