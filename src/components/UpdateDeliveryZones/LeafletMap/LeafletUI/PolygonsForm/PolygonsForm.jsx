import React, { useState } from 'react';
import { Paper, FormGroup, FormControl, FormControlLabel, Radio, Slide, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Delete, Save, Undo } from '@material-ui/icons';

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

function PolygonsForm({ savePolygon, removeAllPoints, removePoint, deliveryZoneState }) {
  const classes = useStyles();
  const [radius, setRadius] = useState('4px');
  const iconButtonSize = 'small';

  const handleActivatePolygon = (event) => {};

  const removeAllPointsHandler = (event) => {
    removeAllPoints();
  };
  const removePointHandler = (event) => {
    removePoint();
  };

  const savePolygonHandler = (event) => {
    savePolygon();
  };
  const handlePolygonMenuExit = (event) => {
    setRadius('0 4px 4px 0');
  };
  const handlePolygonMenuEnter = (event) => {
    setRadius('0 4px 4px 0');
  };

  let saveButtonEnabled = true;
  if (deliveryZoneState.activePolygon) {
    saveButtonEnabled = deliveryZoneState.activePolygon.coords.length < 3;
  }

  return (
    <Paper style={{ zIndex: 1000, marginTop: '10px', direction: 'rtl' }}>
      {deliveryZoneState.activePolygon ? (
        <FormControl style={{ backgroundColor: deliveryZoneState.activePolygon.color }}>
          <FormControlLabel
            control={
              <Radio
                checked={true}
                onClick={handleActivatePolygon}
                name={'checked' + deliveryZoneState.activePolygon.polygonNumber}
                value={deliveryZoneState.activePolygon.polygonNumber}
                size={'small'}
              />
            }
            label="C"
          />
        </FormControl>
      ) : null}

      <FormGroup>
        {deliveryZoneState.polygons.map((polygon, index) =>
          deliveryZoneState.activePolygon.polygonNumber !== polygon.polygonNumber ? (
            <FormControl key={index} style={{ backgroundColor: polygon.color }}>
              <FormControlLabel
                control={
                  <Radio
                    checked={false}
                    onClick={handleActivatePolygon}
                    name={'checked' + polygon.polygonNumber}
                    value={polygon.polygonNumber}
                    size={'small'}
                  />
                }
                label="C"
              />
            </FormControl>
          ) : null,
        )}

        <div className={classes.sliderContainer}>
          <Slide
            direction="left"
            in={deliveryZoneState.drawmode}
            mountOnEnter
            unmountOnExit
            onExited={handlePolygonMenuExit}
            onEnter={handlePolygonMenuEnter}
          >
            <Paper className={classes.sliderPaperOpen}>
              <IconButton className={classes.iconButton} onClick={removeAllPointsHandler} size={iconButtonSize}>
                <Delete />
              </IconButton>
              <IconButton className={classes.iconButton} onClick={removePointHandler} size={iconButtonSize}>
                <Undo />
              </IconButton>
              <IconButton
                className={classes.iconButton}
                onClick={savePolygonHandler}
                size={iconButtonSize}
                disabled={saveButtonEnabled}
              >
                <Save />
              </IconButton>
            </Paper>
          </Slide>
        </div>
      </FormGroup>
    </Paper>
  );
}

export default PolygonsForm;
