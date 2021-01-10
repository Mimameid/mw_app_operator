import React from 'react';
import { Paper, IconButton, Slide } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Delete, Save } from '@material-ui/icons';

import { wasPolygonEdited } from '../../../../../utils/utils';

const useStyles = makeStyles((theme) => ({
  sliderContainer: {
    zIndex: 1000,
    display: 'inline-block',
    overflow: 'hidden',
    paddingBottom: '2px',
    marginBottom: '-4px',

    verticalAlign: 'top',
  },
  sliderPaperOpen: {
    borderRadius: '4px 0 0 4px',
    marginBottom: '2px',
  },
  iconButton: {
    padding: theme.spacing(1),
  },
  deleteIconAnimation: {
    color: '#2a9d8f',
    animationDuration: '0.7s',
    animationIterationCount: 'infinite',
    animationName: '$pulse',
    animationTimingFunction: 'linear',
  },
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(0.9)',
    },
    '50%': {
      transform: 'scale(1.1)',
    },
    '100%': {
      transform: 'scale(0.9)',
    },
  },
}));

function DrawEditorPanel({ setParentRadius, toggleDeleteMode, saveArea, deliveryZoneState }) {
  const classes = useStyles();
  const iconButtonSize = 'small';

  const deleteModeHandler = (event) => {
    toggleDeleteMode();
  };

  const saveAreaHandler = (event) => {
    saveArea();
  };
  const handlePolygonMenuExit = (event) => {
    setParentRadius('4px');
  };
  const handlePolygonMenuEnter = (event) => {
    setParentRadius('0 4px 4px 0');
  };

  let saveButtonEnabled = true;
  if (deliveryZoneState.drawMode) {
    saveButtonEnabled =
      deliveryZoneState.areaPolygons[deliveryZoneState.selectedPolygonIndex][0].length < 4 ||
      !wasPolygonEdited(deliveryZoneState);
  }

  return (
    <div className={classes.sliderContainer}>
      <Slide
        direction="left"
        in={deliveryZoneState.drawMode}
        mountOnEnter
        unmountOnExit
        onExited={handlePolygonMenuExit}
        onEnter={handlePolygonMenuEnter}
      >
        <Paper className={classes.sliderPaperOpen}>
          <IconButton
            className={`${classes.iconButton} ${deliveryZoneState.deleteMode ? classes.deleteIconAnimation : null}`}
            onClick={deleteModeHandler}
            size={iconButtonSize}
          >
            <Delete />
          </IconButton>
          <IconButton
            className={classes.iconButton}
            onClick={saveAreaHandler}
            size={iconButtonSize}
            disabled={saveButtonEnabled}
          >
            <Save />
          </IconButton>
        </Paper>
      </Slide>
    </div>
  );
}

export default DrawEditorPanel;
