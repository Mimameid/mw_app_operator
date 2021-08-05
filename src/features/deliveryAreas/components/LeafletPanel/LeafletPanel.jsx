import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDraw } from 'features/deliveryAreas/slices/mode/actions';
import { createArea, deactivateArea } from 'features/deliveryAreas/slices/areaData/actions';
import L from 'leaflet';

import { Paper, IconButton, makeStyles } from '@material-ui/core';
import AreasPanel from './AreasPanel/AreasPanelContainer';
import SaveDrawer from './SaveDrawer';
import PLZDrawer from './PLZDrawer';
import CustomDialog from 'common/components/dialogs/CustomDialog';
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
  const { draw, edited } = useSelector((state) => ({
    draw: state.deliveryAreas.mode.draw,
    edited: state.deliveryAreas.mode.edited,
  }));
  const { areaData, activeArea } = useSelector((state) => ({
    areaData: state.deliveryAreas.areaData,
    activeArea: state.deliveryAreas.areaData.activeArea,
  }));

  const divRef = useRef(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [plzDialogOpen, setPLZDialogOpen] = useState(false);
  const [radius, setRadius] = useState('4px');
  const [plzOpen, setPLZOpen] = useState(false);

  useEffect(() => {
    // this prevents map events being triggered before ui events (on custom (non leaflet) elements)
    L.DomEvent.disableClickPropagation(divRef.current);
  }, [draw]);

  useEffect(() => {
    if (activeArea.areaNumber > -1) {
      setPLZOpen(false);
    }
  }, [activeArea.areaNumber]);

  const handleAddButton = (event) => {
    dispatch(createArea());
    dispatch(toggleDraw());
  };

  const handleCancelButton = (event) => {
    if (edited) {
      setDialogOpen(true);
    } else {
      if (draw) {
        dispatch(toggleDraw());
      }
      dispatch(deactivateArea());
    }
  };

  const handleRejectDialog = (event) => {
    setDialogOpen(false);
    setPLZDialogOpen(false);
  };

  const handleAcceptDialog = (event) => {
    if (draw) {
      dispatch(toggleDraw());
    }
    dispatch(deactivateArea());

    setDialogOpen(false);
  };

  const handleOpenPLZDrawer = (event) => {
    if (edited) {
      setPLZDialogOpen(true);
    } else {
      dispatch(deactivateArea());
      if (draw) {
        dispatch(toggleDraw());
      }
      setPLZOpen(!plzOpen);
    }

    //stop propagation since the plzdrawer has an 'outside of element click" listener
    event.stopPropagation();
  };

  const handlePLZAcceptDialog = (event) => {
    dispatch(deactivateArea());
    if (draw) {
      dispatch(toggleDraw());
    }
    setPLZDialogOpen(false);
    setPLZOpen(true);

    //stop propagation since the plzdrawer has an 'outside of element click" listener
    event.stopPropagation();
  };

  return (
    <div className={classes.uiContainer} ref={divRef}>
      <div style={{ direction: 'rtl' }}>
        <Paper className={classes.buttonsContainer} style={{ borderRadius: radius }}>
          <IconButton
            className={`${classes.iconButton} ${draw || edited ? classes.cancelIcon : null}`}
            onClick={edited || draw ? handleCancelButton : handleAddButton}
            size="small"
            disabled={areaData.areas.length > MAX_AREAS - 1}
          >
            {edited || draw ? <Block /> : <Add />}
          </IconButton>
          <IconButton className={classes.iconButton} onClick={handleOpenPLZDrawer}>
            PLZ
          </IconButton>
        </Paper>
        <PLZDrawer open={plzOpen} setPLZOpen={setPLZOpen} setParentRadius={setRadius} />
        <SaveDrawer plzOpen={plzOpen} setParentRadius={setRadius} />
      </div>
      <AreasPanel />

      <CustomDialog
        open={dialogOpen}
        handleReject={handleRejectDialog}
        handleAccept={handleAcceptDialog}
        title="Bearbeitung abbrechen?"
        message="Wenn Sie die Bearbeitung abbrechen, werden alle Veränderungen
          unwiederruflich gelöscht."
      />
      <CustomDialog
        open={plzDialogOpen}
        handleReject={handleRejectDialog}
        handleAccept={handlePLZAcceptDialog}
        title="Bearbeitung abbrechen?"
        message="Wenn Sie die Bearbeitung abbrechen, werden alle Veränderungen
        unwiederruflich gelöscht."
      />
    </div>
  );
}

export default LeafletPanel;