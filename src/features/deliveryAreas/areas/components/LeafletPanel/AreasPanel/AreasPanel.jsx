import React, { useEffect, useRef } from 'react';

import { Divider, Paper } from '@mui/material';
import AreaEntry from './AreaEntry/AreaEntry';

function AreasPanel({ draw, edited, areas, areaNumber }) {
  const panelRef = useRef();

  useEffect(() => {
    panelRef.current.style.display = edited || draw ? 'none' : 'block';
  }, [draw, edited]);

  return (
    <Paper
      sx={{
        overflow: 'hidden',
        position: 'relative',
        marginTop: '10px',
        width: '200px',
      }}
      ref={panelRef}
    >
      {areas.map((area, index) => (
        <React.Fragment key={index}>
          <AreaEntry
            color={area.color}
            minOrderValue={area.minOrderValue}
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
