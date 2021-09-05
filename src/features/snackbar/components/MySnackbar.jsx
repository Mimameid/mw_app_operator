/* eslint-disable react/no-did-update-set-state */

import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { STATUS_CODE } from 'common/constants';

import { Snackbar, Slide } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

function TransitionDown(props) {
  return <Slide {...props} direction="left" />;
}

function getStatusName(type) {
  let statusName;
  switch (type) {
    case STATUS_CODE.ERROR:
      statusName = 'error';
      break;
    case STATUS_CODE.WARNING:
      statusName = 'warning';
      break;
    case STATUS_CODE.SUCCESS:
      statusName = 'success';
      break;
    case STATUS_CODE.INFO:
      statusName = 'info';
      break;
    default:
      statusName = '';
  }
  return { statusName };
}

function createSnackInfo(message, type) {
  const { statusName } = getStatusName(type);
  return { statusName, message };
}

function MySnackBar() {
  const { type, message, count } = useSelector((state) => ({
    type: state.snackbar.statusCode,
    message: state.snackbar.statusMessage,
    count: state.snackbar.count,
  }));

  let countRef = useRef(count);
  let newSnackRef = useRef([]);
  let timerRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [currentSnack, setCurrentSnack] = useState(null);

  useEffect(() => {
    if (countRef.current !== count) {
      newSnackRef.current.push(createSnackInfo(message, type));
      if (newSnackRef.current.length > 1) {
        clearTimeout(timerRef.current);
        setOpen(false);
      }

      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setOpen(false), 1800);
      setCurrentSnack(newSnackRef.current.shift());
      setOpen(true);
    }
  }, [count, message, type]);

  if (!currentSnack) {
    return null;
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={open}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      TransitionComponent={TransitionDown}
      transitionDuration={{ enter: 200, exit: 200 }}
      disableWindowBlurListener
    >
      <Alert aria-describedby="status-snackbar" elevation={6} variant="filled" severity={currentSnack.statusName}>
        {currentSnack.message}
      </Alert>
    </Snackbar>
  );
}

export default MySnackBar;
