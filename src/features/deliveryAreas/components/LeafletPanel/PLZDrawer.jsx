import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Paper, TextField, Slide } from '@material-ui/core';
import useClickOutsideElement from 'common/hooks/useClickOutsideElement';
import { fetchArea } from 'features/deliveryAreas/slices/plzAreas/plzAreasSlice';
import { makeStyles } from '@material-ui/styles';

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

function PLZDrawer({ open, setParentRadius, setPLZOpen }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const iconButtonSize = 'small';
  const plzInputRef = useRef(null);

  useClickOutsideElement(plzInputRef, () => {
    setPLZOpen(false);
  });

  const handleDrawerExit = (event) => {
    setParentRadius('4px');
  };

  const handleDrawerEnter = (event) => {
    setParentRadius('0 4px 4px 0');
  };

  const onChangePLZ = (event) => {
    let plz = event.target.value;
    setError(false);
    const plzRegex = /^([0]{1}[1-9]{1}|[1-9]{1}[0-9]{1})[0-9]{3}$/;
    if (plz.match(plzRegex)) {
      setDisabled(true);
      const promise = dispatch(fetchArea(plz));
      promise.finally(() => {
        setPLZOpen(false);
        setDisabled(false);
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
            ref={plzInputRef}
          />
        </Paper>
      </Slide>
    </div>
  );
}

export default PLZDrawer;
