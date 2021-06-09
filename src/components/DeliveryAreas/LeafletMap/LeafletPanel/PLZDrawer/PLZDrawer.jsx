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
  setStatusError,
  setStatusRequest,
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
    const plzRegex = /^([0]{1}[1-9]{1}|[1-9]{1}[0-9]{1})[0-9]{3}$/;
    if (value.match(plzRegex)) {
      const url = new URL('areas/' + value, process.env.REACT_APP_API_URL);
      const options = {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      setDisabled(true);

      fetch(url.href, options)
        .then((response) => {
          setDisabled(false);
          return response.json();
        })
        .then((data) => {
          if (data.length < 1) {
            setStatusError('PLZ existiert nicht!');
            setPLZOpen(false);
            return;
          }

          createArea();
          addPolygon(data['area']);
          saveArea();
          setDisabled(false);
          setPLZOpen(false);
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
