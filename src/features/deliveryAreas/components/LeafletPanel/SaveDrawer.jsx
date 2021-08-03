import React from 'react';

import { Paper, IconButton, Slide, makeStyles } from '@material-ui/core';
import { Save } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDraw } from 'features/deliveryAreas/slices/mode/actions';
import { saveArea } from 'features/deliveryAreas/slices/areaData/actions';

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

function SaveDrawer({ plzOpen, setParentRadius }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { draw, edited } = useSelector((state) => ({
    draw: state.deliveryAreas.mode.draw,
    edited: state.deliveryAreas.mode.edited,
  }));

  const iconButtonSize = 'small';

  const saveAreaHandler = (event) => {
    dispatch(saveArea());
    if (draw) {
      dispatch(toggleDraw());
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

  return (
    <div className={classes.sliderContainer}>
      <Slide
        direction="left"
        in={edited}
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
