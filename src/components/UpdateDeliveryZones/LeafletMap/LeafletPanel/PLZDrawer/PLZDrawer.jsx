import React, { useRef, useState } from 'react';
import { Paper, TextField, Slide } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import useClickOutsideElement from '../../../../../hooks/useClickOutsideElement';

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
  plzInput: {
    maxWidth: '64px',
    padding: '6px 6px 5px 6px',
    direction: 'ltr',
  },
}));

function PLZDrawer({
  open,
  setParentRadius,
  setPLZOpen,

  createArea,
  saveArea,
  addPolygon,
}) {
  const classes = useStyles();
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const iconButtonSize = 'small';
  const tostilRef = useRef(null);

  useClickOutsideElement(tostilRef, () => {
    setPLZOpen(false);
  });

  const handleDrawerExit = (event) => {
    setParentRadius('4px');
  };

  const handleDrawerEnter = (event) => {
    setParentRadius('0 4px 4px 0');
  };

  const onChangePLZ = (event) => {
    let value = event.target.value;
    setError(false);
    // TODO: see #e75f50
    if (value > 9999 && value < 100000) {
      fetch('./assets/plz_to_location_name.json')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (value in data) {
            setDisabled(true);
            fetch('./assets/plz_to_polygon_mapping_germany.json')
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                createArea();
                addPolygon(data[value]);
                saveArea();
                setDisabled(false);
                setPLZOpen(false);
              });
          } else {
            setError(true);
          }
        });
    }
  };

  return (
    <div className={classes.sliderContainer}>
      <Slide
        direction="left"
        in={open}
        mountOnEnter
        unmountOnExit
        onExited={handleDrawerExit}
        onEnter={handleDrawerEnter}
      >
        <Paper className={classes.sliderPaperOpen}>
          <TextField
            disabled={disabled}
            error={error}
            fullWidth
            autoFocus
            className={classes.plzInput}
            size={iconButtonSize}
            onChange={onChangePLZ}
            inputProps={{
              maxLength: 5,
              style: { textAlign: 'center' },
            }}
            ref={tostilRef}
          />
        </Paper>
      </Slide>
    </div>
  );
}

export default PLZDrawer;
