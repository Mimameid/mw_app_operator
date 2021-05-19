import React, { useRef, useState, useEffect } from 'react';
import { Paper, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Edit, GetApp } from '@material-ui/icons';

import L from 'leaflet';

import { wasAreaEdited } from '../../../../utils/utils.js';
import AreaPanel from './AreaPanel/AreaPanelContainer';
import SaveDrawer from './SaveDrawer/SaveDrawerContainer';
import PLZDrawer from './PLZDrawer/PLZDrawerContainer';
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

  exportButtonContainer: {
    position: 'fixed',
    top: '1px',
    marginTop: '10px',
  },

  iconButton: {
    padding: theme.spacing(1),
    fontSize: theme.typography.body1.fontSize,
  },
  editIcon: {
    transform: 'rotate(-15deg)',
  },
  editIconAnimation: {
    color: theme.palette.primary.main,
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
  areas,
  activeArea,

  toggleDrawMode,
  createArea,
  deactivateArea,
}) {
  const classes = useStyles();
  const divRef = useRef(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [plzDialogOpen, setPLZDialogOpen] = useState(false);
  const [radius, setRadius] = useState('4px');
  const [plzOpen, setPLZOpen] = useState(false);
  const iconButtonSize = 'small';

  useEffect(() => {
    // this prevents map events being triggered before ui events (on custom (non leaflet) elements)
    L.DomEvent.disableClickPropagation(divRef.current);
  }, []);

  useEffect(() => {
    // this prevents map events being triggered before ui events (on custom (non leaflet) elements)
    L.DomEvent.disableClickPropagation(divRef.current);
  }, [drawMode]);

  useEffect(() => {
    if (activeArea.areaNumber > -1) {
      setPLZOpen(false);
    }
  }, [activeArea.areaNumber]);

  const handleAddButton = (event) => {
    if (areas.length < 1) {
      createArea();
      toggleDrawMode();
      return;
    }

    if (wasAreaEdited(areas, activeArea)) {
      setDialogOpen(true);
    } else {
      if (!drawMode) {
        createArea();
        toggleDrawMode();
      } else {
        deactivateArea();
        toggleDrawMode();
      }
    }
  };

  const handleExportData = (event) => {
    const exportData = areas.map((area, areaIndex) => ({
      area: {
        type: 'MultiPolygon',
        // convert lat/lng to lng/lat order to conform with geojson specification
        coordinates: area.areaPolygons.map((polygon, index) => {
          return polygon.map((ring, index) => {
            return ring.map((vertex, index) => {
              return (vertex = [vertex[1], vertex[0]]);
            });
          });
        }),
      },
      delivery_fee: area.deliveryFee,
      minimum_order_value: area.minimumOrderValue,
    }));

    var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportData));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', 'locations.json');
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleRejectDialog = (event) => {
    setDialogOpen(false);
    setPLZDialogOpen(false);
  };

  const handleAcceptDialog = (event) => {
    deactivateArea();
    setDialogOpen(false);
    if (!drawMode) {
      createArea();
    }
    toggleDrawMode();
  };

  const handleOpenPLZDrawer = (event) => {
    if (wasAreaEdited(areas, activeArea)) {
      setPLZDialogOpen(true);
    } else {
      deactivateArea();
      if (drawMode) {
        toggleDrawMode();
      }
      setPLZOpen(!plzOpen);
    }

    //stop propagation since the plzdrawer has an 'outside of element click" listener
    event.stopPropagation();
  };

  const handlePLZAcceptDialog = (event) => {
    deactivateArea();
    if (drawMode) {
      toggleDrawMode();
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
            className={`${classes.iconButton} ${classes.editIcon} ${drawMode ? classes.editIconAnimation : null}`}
            onClick={handleAddButton}
            size={iconButtonSize}
            disabled={areas.length > MAX_AREAS - 1}
          >
            <Edit />
          </IconButton>
          <IconButton className={classes.iconButton} onClick={handleOpenPLZDrawer}>
            PLZ
          </IconButton>
        </Paper>
        <PLZDrawer open={plzOpen} setPLZOpen={setPLZOpen} setParentRadius={setRadius} />
        <SaveDrawer plzOpen={plzOpen} setParentRadius={setRadius} />
      </div>

      <AreaPanel />
      <Paper className={classes.exportButtonContainer} style={{ borderRadius: radius }}>
        <IconButton
          className={classes.iconButton}
          onClick={handleExportData}
          size={iconButtonSize}
          disabled={areas.length < 1}
        >
          <GetApp />
        </IconButton>
      </Paper>

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
