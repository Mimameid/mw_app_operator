import React from 'react';

import LinearRingWrapper from './LinearRingWrapper';

function PolygonWrapper({ polygon, ...props }) {
  return (
    <React.Fragment>
      {polygon.map((linearRing, ringIndex) => (
        <LinearRingWrapper key={ringIndex} linearRing={linearRing} ringIndex={ringIndex} {...props} />
      ))}
    </React.Fragment>
  );
}

export default React.memo(PolygonWrapper);
