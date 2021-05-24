import React, { useRef, useState, useEffect } from 'react';
import { Paper, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add, Block, GetApp } from '@material-ui/icons';

import L from 'leaflet';

import AreasPanel from './AreasPanel/AreasPanelContainer';
import SaveDrawer from './SaveDrawer/SaveDrawerContainer';
import PLZDrawer from './PLZDrawer/PLZDrawerContainer';
import CustomDialog from '../../../common/CustomDialog/CustomDialog';

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

  canelIcon: {
    color: theme.palette.primary.main,
    animationDuration: '0.9s',
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

function LeafletPanel({
  draw,
  areas,
  edited,
  activeArea,

  toggleDraw,
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
  }, [draw]);

  useEffect(() => {
    if (activeArea.areaNumber > -1) {
      setPLZOpen(false);
    }
  }, [activeArea.areaNumber]);

  const handleAddButton = (event) => {
    createArea();
    toggleDraw();
  };

  const handleCancelButton = (event) => {
    if (edited) {
      setDialogOpen(true);
    } else {
      if (draw) {
        toggleDraw();
      }
      deactivateArea();
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
    if (draw) {
      toggleDraw();
    }
    deactivateArea();

    setDialogOpen(false);
  };

  const handleOpenPLZDrawer = (event) => {
    if (edited) {
      setPLZDialogOpen(true);
    } else {
      deactivateArea();
      if (draw) {
        toggleDraw();
      }
      setPLZOpen(!plzOpen);
    }

    //stop propagation since the plzdrawer has an 'outside of element click" listener
    event.stopPropagation();
  };

  const handlePLZAcceptDialog = (event) => {
    deactivateArea();
    if (draw) {
      toggleDraw();
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
            className={`${classes.iconButton} ${draw || edited ? classes.canelIcon : null}`}
            onClick={edited || draw ? handleCancelButton : handleAddButton}
            size={iconButtonSize}
            disabled={areas.length > MAX_AREAS - 1}
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
