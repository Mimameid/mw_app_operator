import React from 'react';
import { Divider, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import PolygonEntry from './PolygonEntry/PolygonEntryContainer';

const useStyles = makeStyles((theme) => ({
  areasContainer: {
    marginTop: '10px',
    width: '200px',
    backgroundColor: 'white',
  },
}));

function AreaPanel({ areas, areaNumber }) {
  const classes = useStyles();

  return (
    <Paper className={classes.areasContainer}>
      {areas.map((area, index) => (
        <React.Fragment key={index}>
          <PolygonEntry
            color={area.color}
            minimumOrderValue={area.minimumOrderValue}
            deliveryFee={area.deliveryFee}
            areaNumber={area.areaNumber}
            currentAreaNumber={areaNumber}
          />
          {index !== areas.length - 1 ? <Divider /> : null}
        </React.Fragment>
      ))}
    </Paper>
  );
}

export default AreaPanel;
