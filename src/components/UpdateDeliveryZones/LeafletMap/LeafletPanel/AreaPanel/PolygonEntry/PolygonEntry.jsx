import React, { useState } from 'react';
import { Paper, IconButton, Divider, TextField, InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Delete } from '@material-ui/icons';

import CustomSwitch from './CustomSwitch/CustomSwitch';
import CustomDialog from '../../../../../common/CustomDialog/CustomDialog';

import { wasPolygonEdited } from '../../../../../../utils/utils';

const useStyles = makeStyles((theme) => ({
  polygonContainer: {
    direction: 'ltr',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '0px',
    '&:last-child': {
      borderRadius: '0 0 4px 4px',
    },
    '&:first-child': {
      borderRadius: '4px 4px 0 0',
    },
    '&:only-child': {
      borderRadius: '4px',
    },
  },
  polygonColorDisplay: {
    marginRight: 'auto',
  },
  orderValueContainer: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  minimumOrderValueInput: {
    maxWidth: '36px',
    padding: '2px',
    marginLeft: 'auto',
    fontSize: '0.8rem',
    '& .MuiInputBase-input': {
      padding: '1px 2px',
    },
    '& .MuiOutlinedInput-root': {
      fontSize: '0.8rem',
      padding: '2px',

      '& fieldset': {},
      '&:hover fieldset': {
        borderColor: '#2a9d8f',
        border: '1px solid',
        borderRadius: '2px',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#2a9d8f',
        border: '1px solid',
        borderRadius: '2px',
      },
    },
  },
}));

function PolygonEntry({
  toggleDrawMode,
  toggleSelectMode,
  activateArea,
  deactivateArea,
  deleteArea,
  deliveryZoneState,

  color,
  index,
  minimumOrderValue,
  areaNumber,
}) {
  const classes = useStyles();
  const [changeZoneDialogOpen, setchangeZoneDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [orderValue, setOrderValue] = useState(minimumOrderValue);

  const handleActivateArea = (event, areaNumber) => {
    if (deliveryZoneState.selectMode) {
      toggleSelectMode();
    }
    if (!deliveryZoneState.drawMode) {
      toggleDrawMode();
      activateArea(areaNumber);
    } else {
      if (wasPolygonEdited(deliveryZoneState)) {
        setchangeZoneDialogOpen(true);
      } else {
        if (deliveryZoneState.areaNumber === areaNumber) {
          toggleDrawMode();
          deactivateArea();
        } else {
          activateArea(areaNumber);
        }
      }
    }
  };

  const handleActivateAreaDialogReject = (event) => {
    setchangeZoneDialogOpen(false);
  };

  const handleActivateAreaDialogAccept = (event) => {
    setchangeZoneDialogOpen(false);
    if (deliveryZoneState.areaNumber === areaNumber) {
      toggleDrawMode();
      deactivateArea();
    } else {
      activateArea(areaNumber);
    }
  };

  const handleDeleteArea = (event) => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogReject = (event) => {
    setDeleteDialogOpen(false);
  };

  const handleDeleteDialogAccept = (event) => {
    deleteArea(areaNumber);
  };

  const onChangeOrderValue = (event) => {
    let value = event.target.value;
    if (!value) {
      setOrderValue(0);
    }

    value = Number(value);
    if (value > -1 && value < 100) {
      setOrderValue(value);
    }
  };

  return (
    <React.Fragment key={index}>
      <Paper className={classes.polygonContainer}>
        <CustomSwitch
          color={color}
          areaNumber={areaNumber}
          currentAreaNumber={deliveryZoneState.areaNumber}
          handleActivateArea={handleActivateArea}
        />
        <Divider orientation="vertical" flexItem />
        <TextField
          className={classes.minimumOrderValueInput}
          size="small"
          value={orderValue}
          onChange={onChangeOrderValue}
          InputProps={{
            startAdornment: (
              <InputAdornment position="end" style={{ marginLeft: 0 }}>
                €
              </InputAdornment>
            ),
          }}
          inputProps={{
            maxLength: 2,
            style: { textAlign: 'right' },
          }}
        />
        <Divider orientation="vertical" flexItem style={{ margin: '6px' }} />
        <IconButton size="small" onClick={handleDeleteArea}>
          <Delete />
        </IconButton>
      </Paper>
      <CustomDialog
        open={changeZoneDialogOpen}
        title="Zone wechseln?"
        message="Die aktuelle Zone wurde nicht gespeichert. Wenn Sie die Zone wechseln, werden alle Veränderungen
        unwiederruflich gelöscht."
        handleReject={handleActivateAreaDialogReject}
        handleAccept={handleActivateAreaDialogAccept}
      />
      <CustomDialog
        open={deleteDialogOpen}
        title="Zone löschen?"
        message="Sind Sie sicher, dass Sie die Zone löschen wollen?"
        handleReject={handleDeleteDialogReject}
        handleAccept={handleDeleteDialogAccept}
      />
    </React.Fragment>
  );
}

export default PolygonEntry;
