import React, { useRef, useState } from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import PolygonEntry from './PolygonEntry/PolygonEntryContainer';

const useStyles = makeStyles((theme) => ({
  polygonsContainer: {
    marginTop: '10px',
    width: '200px',
    backgroundColor: 'white',
  },
}));

function AreaPanel({ activateArea, deliveryZoneState }) {
  const classes = useStyles();

  return (
    <Paper className={classes.polygonsContainer}>
      {deliveryZoneState.areas.map((area, index) => (
        <PolygonEntry
          key={index}
          color={area.color}
          minimumOrderValue={area.minimumOrderValue}
          areaNumber={area.areaNumber}
          currentAreaNumber={deliveryZoneState.areaNumber}
        />
      ))}
    </Paper>
  );
}

export default AreaPanel;
