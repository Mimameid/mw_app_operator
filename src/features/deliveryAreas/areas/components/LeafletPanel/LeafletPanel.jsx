import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createArea, deactivateArea } from 'features/deliveryAreas/areas/actions';
import L from 'leaflet';

import { Paper, IconButton, makeStyles } from '@material-ui/core';
import AreasPanel from './AreasPanel/AreasPanelContainer';
import PLZTextField from './PLZTextField';
import { Add, Block } from '@material-ui/icons';

const MAX_AREAS = 11;

const useStyles = makeStyles((theme) => ({
  uiContainer: {
    position: 'absolute',
    right: 10,
    top: 200,
    zIndex: 400,
    direction: 'rtl',
    '& :hover': {
      cursor: 'default',
    },
  },
  buttonsContainer: {
    display: 'inline-block',
  },

  exportButtonContainer: {
    position: 'fixed',
    top: '1px',
    marginTop: '10px',
  },

  iconButton: {
    padding: theme.spacing(1),
    fontSize: theme.typography.body1.fontSize,
  },

  cancelIcon: {
    color: theme.palette.primary.main,
    animationDuration: '1.1s',
    animationIterationCount: 'infinite',
    animationName: '$pulse',
    animationTimingFunction: 'linear',
  },
  '@keyframes pulse': {
    '0%': {
      transform: 'rotate(-15deg) scale(0.95)',
    },
    '50%': {
      transform: 'rotate(-15deg) scale(1.05)',
    },
    '100%': {
      transform: 'rotate(-15deg) scale(0.95)',
    },
  },
}));

function LeafletPanel() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { draw } = useSelector((state) => state.mode.draw);
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
    <div className={classes.uiContainer} ref={divRef}>
      <div style={{ direction: 'rtl' }}>
        <Paper className={classes.buttonsContainer}>
          <IconButton
            className={`${classes.iconButton} ${draw ? classes.cancelIcon : null}`}
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
    </div>
  );
}

export default LeafletPanel;
