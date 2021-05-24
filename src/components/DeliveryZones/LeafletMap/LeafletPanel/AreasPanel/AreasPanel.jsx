import React, { useEffect, useRef } from 'react';
import { Divider, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import AreaEntry from './AreaEntry/AreaEntryContainer';

const useStyles = makeStyles((theme) => ({
  areasContainer: {
    position: 'relative',
    marginTop: '10px',
    width: '200px',
  },
}));

function AreasPanel({ draw, edited, areas, areaNumber }) {
  const classes = useStyles();
  const panelRef = useRef();

  useEffect(() => {
    panelRef.current.style.display = edited || draw ? 'none' : 'block';
  }, [draw, edited]);

  return (
    <Paper className={classes.areasContainer} ref={panelRef}>
      {areas.map((area, index) => (
        <React.Fragment key={index}>
          <AreaEntry
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

export default AreasPanel;
