import React from 'react';
import { Paper, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add, Clear } from '@material-ui/icons';

import PolygonsForm from './PolygonsForm/PolygonsFormContainer';

const useStyles = makeStyles((theme) => ({
  uiContainer: {
    position: 'absolute',
    right: 10,
    top: 200,
    zIndex: 1000,
  },
  addPolygonButton: {
    display: 'inline-block',
    zIndex: 1000,
  },
  sliderContainer: {
    zIndex: 1000,
    display: 'inline-block',
    overflow: 'hidden',
    padding: '0 0 2px 2px',
    verticalAlign: 'top',
  },
  sliderPaperOpen: {
    borderRadius: '4px 0 0 4px',
  },
  iconButton: {
    padding: theme.spacing(1),
  },
}));

function LeafletUI({ toggleDrawmode, createPolygon, savePolygon, removeAllPoints, removePoint, deliveryZoneState }) {
  const classes = useStyles();
  const iconButtonSize = 'small';
  //const iconButtonDisabled =

  const handleAddButton = (event) => {
    if (!deliveryZoneState.drawmode) {
      createPolygon();
      toggleDrawmode();
    } else {
      // deactivatePolygon();
      toggleDrawmode();
    }
  };

  return (
    <div className={classes.uiContainer}>
      <div style={{ direction: 'rtl' }}>
        <Paper className={classes.addPolygonButton}>
          <IconButton className={classes.iconButton} onClick={handleAddButton} size={iconButtonSize}>
            {deliveryZoneState.drawmode ? <Clear /> : <Add />}
          </IconButton>
        </Paper>
      </div>
      <PolygonsForm />
    </div>
  );
}

export default LeafletUI;
