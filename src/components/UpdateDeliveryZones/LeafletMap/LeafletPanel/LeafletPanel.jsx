import React, { useRef, useState, useEffect } from 'react';
import { Paper, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add, Close, Edit } from '@material-ui/icons';

import L from 'leaflet';

import { wasPolygonEdited } from '../../../../utils/utils.js';
import AreaPanel from './AreaPanel/AreaPanelContainer';
import DrawEditorPanel from './DrawEditorPanel/DrawEditorPanelContainer';
import CustomDialog from '../../../common/CustomDialog/CustomDialog';

const MAX_AREAS = 11;

const useStyles = makeStyles((theme) => ({
  uiContainer: {
    position: 'absolute',
    right: 10,
    top: 200,
    zIndex: 1000,
    direction: 'rtl',
    '& :hover': {
      cursor: 'default',
    },
  },
  buttonsContainer: {
    display: 'inline-block',
  },
  iconButton: {
    padding: theme.spacing(1),
    fontSize: 0,
  },
  editIcon: {
    transform: 'rotate(-15deg)',
  },
  editIconAnimation: {
    color: '#2a9d8f',
    animationDuration: '0.7s',
    animationIterationCount: 'infinite',
    animationName: '$pulse',
    animationTimingFunction: 'linear',
  },
  '@keyframes pulse': {
    '0%': {
      transform: 'rotate(-15deg) scale(0.9)',
    },
    '50%': {
      transform: 'rotate(-15deg) scale(1.1)',
    },
    '100%': {
      transform: 'rotate(-15deg) scale(0.9)',
    },
  },
}));

function LeafletPanel({
  drawMode,
  selectMode,
  deleteMode,
  toggleDrawMode,
  toggleSelectMode,
  toggleDeleteMode,
  createArea,
  deactivateArea,
  deliveryZoneState,
}) {
  const classes = useStyles();
  const divRef = useRef(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editButtonDialogOpen, setEditButtonDialogOpen] = useState(false);
  const [radius, setRadius] = useState('4px');
  const iconButtonSize = 'small';

  useEffect(() => {
    // this prevents map events being triggered before ui events (on custom (non leaflet) elements)
    L.DomEvent.disableClickPropagation(divRef.current);
  }, []);

  useEffect(() => {
    // this prevents map events being triggered before ui events (on custom (non leaflet) elements)
    L.DomEvent.disableClickPropagation(divRef.current);
  }, [drawMode]);

  const handleAddButton = (event) => {
    if (!drawMode) {
      if (selectMode) {
        toggleSelectMode();
      }

      toggleDrawMode();
      createArea();
    } else {
      if (wasPolygonEdited(deliveryZoneState)) {
        setDialogOpen(true);
      } else {
        setDialogOpen(false);
        toggleDrawMode();
        deactivateArea();
        if (selectMode) {
          toggleSelectMode();
        }
      }

      if (deleteMode) {
        toggleDeleteMode();
      }
    }
  };

  const handleEditButton = (event) => {
    if (!drawMode) {
      if (!selectMode) {
        toggleSelectMode();
      } else {
        toggleSelectMode();
      }
    } else {
      if (wasPolygonEdited(deliveryZoneState)) {
        setEditButtonDialogOpen(true);
      } else {
        setEditButtonDialogOpen(false);
        toggleDrawMode();
        toggleSelectMode();
        deactivateArea();
      }
    }
  };

  const handleRejectDialog = (event) => {
    setDialogOpen(false);
    setEditButtonDialogOpen(false);
  };

  const handleAcceptDialog = (event) => {
    setDialogOpen(false);
    toggleDrawMode();
    deactivateArea();
  };

  const handleEditAcceptDialog = (event) => {
    setEditButtonDialogOpen(false);
    toggleDrawMode();
    deactivateArea();
    toggleSelectMode();
  };

  return (
    <div className={classes.uiContainer} ref={divRef}>
      <div style={{ direction: 'rtl' }}>
        <Paper className={classes.buttonsContainer} style={{ borderRadius: radius }}>
          <IconButton
            className={classes.iconButton}
            onClick={handleAddButton}
            size={iconButtonSize}
            disabled={deliveryZoneState.areas.length > MAX_AREAS - 1}
          >
            {drawMode ? <Close /> : <Add />}
          </IconButton>

          <IconButton
            className={`${classes.iconButton} ${classes.editIcon} ${selectMode ? classes.editIconAnimation : null}`}
            onClick={handleEditButton}
            size={iconButtonSize}
          >
            <Edit />
          </IconButton>
        </Paper>
        <DrawEditorPanel setParentRadius={setRadius} />
      </div>
      <CustomDialog
        open={dialogOpen}
        handleReject={handleRejectDialog}
        handleAccept={handleAcceptDialog}
        title="Bearbeitung abbrechen?"
        message="Wenn Sie die Bearbeitung abbrechen, werden alle Veränderungen
          unwiederruflich gelöscht."
      />
      <CustomDialog
        open={editButtonDialogOpen}
        handleReject={handleRejectDialog}
        handleAccept={handleEditAcceptDialog}
        title="Bearbeitung abbrechen?"
        message="Wenn Sie die Bearbeitung abbrechen, werden alle Veränderungen
          unwiederruflich gelöscht."
      />

      <AreaPanel />
    </div>
  );
}

export default LeafletPanel;
