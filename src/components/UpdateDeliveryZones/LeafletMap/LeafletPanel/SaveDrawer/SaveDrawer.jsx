import React from 'react';
import { Paper, IconButton, Slide } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Save } from '@material-ui/icons';

import { wasAreaEdited } from '../../../../../utils/utils';

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

function SaveDrawer({
  drawMode,
  areas,
  activeArea,

  setParentRadius,
  toggleDrawMode,
  saveArea,
}) {
  const classes = useStyles();
  const iconButtonSize = 'small';

  const saveAreaHandler = (event) => {
    saveArea();
    if (drawMode) {
      toggleDrawMode();
    }
  };
  const handlePolygonMenuExit = (event) => {
    setParentRadius('4px');
  };
  const handlePolygonMenuEnter = (event) => {
    setParentRadius('0 4px 4px 0');
  };

  let enablePanel = true;
  if (activeArea.areaNumber > -1) {
    enablePanel = !wasAreaEdited(areas, activeArea);
  }

  return (
    <div className={classes.sliderContainer}>
      <Slide
        direction="left"
        in={activeArea.areaNumber > -1 && !enablePanel}
        mountOnEnter
        unmountOnExit
        onExited={handlePolygonMenuExit}
        onEnter={handlePolygonMenuEnter}
      >
        <Paper className={classes.sliderPaperOpen}>
          <IconButton className={classes.iconButton} onClick={saveAreaHandler} size={iconButtonSize}>
            <Save />
          </IconButton>
        </Paper>
      </Slide>
    </div>
  );
}

export default SaveDrawer;
