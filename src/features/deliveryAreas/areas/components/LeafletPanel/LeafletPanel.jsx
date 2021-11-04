import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createArea, deactivateArea } from 'features/deliveryAreas/areas/actions';
import L from 'leaflet';

import { Box, Paper, IconButton } from '@mui/material';
import AreasPanel from './AreasPanel/AreasPanelContainer';
import PLZTextField from './PLZTextField';
import { Add, Block } from '@mui/icons-material';
import { keyframes } from '@mui/system';

const MAX_AREAS = 11;

const pulse = keyframes`
  0% {
    transform: rotate(-15deg) scale(0.95);
  }
  50% {
    transform: rotate(-15deg) scale(1.05);
  }
  100% {
    transform: rotate(-15deg) scale(0.95);
  }`;

function LeafletPanel() {
  const dispatch = useDispatch();
  const draw = useSelector((state) => state.mode.draw);
  const { areas } = useSelector((state) => ({
    areas: state.deliveryAreas.areas,
  }));

  const divRef = useRef(null);

  useEffect(() => {
    // this prevents map events being triggered before ui events (on custom (non leaflet) elements)
    L.DomEvent.disableClickPropagation(divRef.current);
  }, [draw]);

  const handleAddButton = (event) => {
    dispatch(createArea());
  };

  const handleCancelButton = (event) => {
    dispatch(deactivateArea());
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        right: 10,
        top: 200,
        zIndex: 400,
        direction: 'rtl',
        '& :hover': {
          cursor: 'default',
        },
      }}
      ref={divRef}
    >
      <div style={{ direction: 'rtl' }}>
        <Paper sx={{ display: 'inline-block' }}>
          <IconButton
            sx={{
              p: 1,
              fontSize: 'body1.fontSize',

              color: draw ? 'primary.main' : null,
              animation: draw ? `${pulse} 1.1s infinite linear` : '',
            }}
            onClick={draw ? handleCancelButton : handleAddButton}
            size="small"
            disabled={areas.areas.length > MAX_AREAS - 1}
          >
            {draw ? <Block /> : <Add />}
          </IconButton>
          <PLZTextField />
        </Paper>
      </div>
      <AreasPanel />
    </Box>
  );
}

export default LeafletPanel;
