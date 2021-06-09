import React from 'react';
import { Paper, IconButton, Slide } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Save } from '@material-ui/icons';

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
    color: theme.palette.primary.main,
  },
}));

function SaveDrawer({
  plzOpen,
  setParentRadius,
  toggleDraw,
  saveArea,

  draw,
  edited,
  areas,
  activeArea,
}) {
  const classes = useStyles();
  const iconButtonSize = 'small';

  const saveAreaHandler = (event) => {
    saveArea();
    if (draw) {
      toggleDraw();
    }
  };
  const handlePolygonMenuExit = (event) => {
    if (!plzOpen) {
      setParentRadius('4px');
    }
  };

  const handlePolygonMenuEnter = (event) => {
    setParentRadius('0 4px 4px 0');
  };

  let enablePanel = true;
  if (activeArea.areaNumber > -1) {
    enablePanel = !edited;
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
