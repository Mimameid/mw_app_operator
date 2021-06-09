import React, { useRef, useState } from 'react';
import { IconButton, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Delete, Add } from '@material-ui/icons';

import CustomDialog from '../../../../../common/CustomDialog/CustomDialog';
import MinimumOrderValueInput from './MinimumOrderValueInput/MinimumOrderValueInput';
import DeliveryFeeInput from './DeliveryFeeInput/DeliveryFeeInput';

const useStyles = (props) => {
  return makeStyles((theme) => ({
    polygonContainer: {
      direction: 'ltr',
      display: 'flex',
      alignItems: 'center',
      borderRadius: '0px',
      overflow: 'hidden',
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

    polygonSelected: {
      backgroundColor: props.color + '77',
    },
    entryHighlight: {
      backgroundColor: props.color + '77',
    },
    colorArea: {
      backgroundColor: props.color,
      flexBasis: '28px',
      alignSelf: 'stretch',
      '&:hover': {
        cursor: 'pointer',
      },
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
          borderColor: theme.palette.primary.main,

          border: '1px solid',
          borderRadius: '2px',
        },
        '&.Mui-focused fieldset': {
          borderColor: theme.palette.primary.main,
          border: '1px solid',
          borderRadius: '2px',
        },
      },
    },
  }));
};

function AreaEntry({
  color,
  index,
  minimumOrderValue,
  deliveryFee,
  areaNumber,

  draw,
  edited,
  areas,
  activeArea,

  toggleDraw,
  activateArea,
  deactivateArea,
  deleteArea,
  addEmptyPolygon,
  setMinimumOrderValue,
  setDeliveryFee,
}) {
  const classes = useStyles({ color })();
  const polygonContainer = useRef();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [changeAreaDialogOpen, setChangeAreaDialogOpen] = useState(false);

  const handleActivateArea = (event) => {
    // if (activeArea.areaNumber === areaNumber || event.target !== event.currentTarget) {
    //   return;
    // }
    // if (activeArea.areaNumber === areaNumber) {
    //   return;
    // }

    if (edited) {
      if (activeArea.areaNumber === areaNumber) {
        return;
      }
      setChangeAreaDialogOpen(true);
    } else {
      if (draw) {
        toggleDraw();
      }
      if (activeArea.areaNumber === areaNumber) {
        deactivateArea();
      } else {
        activateArea(areaNumber);
      }
    }
  };

  const handleAddPolygon = (event) => {
    event.stopPropagation();

    activateArea(areaNumber);
    addEmptyPolygon();
    toggleDraw();
  };

  const handleDeleteDialogReject = (event) => {
    setDeleteDialogOpen(false);
  };

  const handleDeleteDialogAccept = (event) => {
    if (activeArea.areaNumber === areaNumber) {
      deactivateArea();
    }
    deleteArea(areaNumber);
    setDeleteDialogOpen(false);
  };

  const handleActivateAreaDialogReject = (event) => {
    setChangeAreaDialogOpen(false);
  };

  const handleActivateAreaDialogAccept = (event) => {
    setChangeAreaDialogOpen(false);
    if (draw) {
      toggleDraw();
    }
    if (activeArea.areaNumber === areaNumber) {
      deactivateArea();
    } else {
      activateArea(areaNumber);
    }
  };

  const handleMouseOver = (event) => {
    polygonContainer.current.classList.add(classes.entryHighlight);
  };
  const handleMouseLeave = (event) => {
    polygonContainer.current.classList.remove(classes.entryHighlight);
  };

  const onChangeDeliveryFee = (event) => {
    let value = event.target.value;
    if (!value) {
      value = 0;
    }
    value = Number(value);
    if (value > -1 && value < 100) {
      setDeliveryFee({ value: value, areaNumber: areaNumber });
    }
  };
  const onChangeOrderValue = (event) => {
    let value = event.target.value;
    if (!value) {
      value = 0;
    }

    value = Number(value);
    if (value > -1 && value < 100) {
      setMinimumOrderValue({ value: value, areaNumber: areaNumber });
    }
  };

  return (
    <React.Fragment key={index}>
      <div
        className={`${classes.polygonContainer} ${activeArea.areaNumber === areaNumber ? classes.polygonSelected : ''}`}
        ref={polygonContainer}
      >
        <div
          className={classes.colorArea}
          onClick={(event) => handleActivateArea(event, areaNumber)}
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
        />

        <Divider orientation="vertical" flexItem />
        <DeliveryFeeInput onChangeDeliveryFee={onChangeDeliveryFee} deliveryFee={deliveryFee} />
        <Divider orientation="vertical" flexItem style={{ margin: '6px' }} />
        <MinimumOrderValueInput onChangeOrderValue={onChangeOrderValue} minimumOrderValue={minimumOrderValue} />
        <Divider orientation="vertical" flexItem style={{ margin: '6px' }} />
        <IconButton className={classes.editIcon} size="small" onClick={handleAddPolygon}>
          <Add />
        </IconButton>
        <IconButton size="small" onClick={(event) => setDeleteDialogOpen(true)}>
          <Delete />
        </IconButton>
      </div>
      <CustomDialog
        open={changeAreaDialogOpen}
        title="Gebiet wechseln?"
        message="Das aktuelle Gebiet wurde nicht gespeichert. Wenn Sie das Gebiet wechseln, werden alle Veränderungen
        unwiederruflich gelöscht."
        handleReject={handleActivateAreaDialogReject}
        handleAccept={handleActivateAreaDialogAccept}
      />
      <CustomDialog
        open={deleteDialogOpen}
        title="Gebiet löschen?"
        message="Sind Sie sicher, dass Sie das Gebietlöschen wollen?"
        handleReject={handleDeleteDialogReject}
        handleAccept={handleDeleteDialogAccept}
      />
    </React.Fragment>
  );
}

export default AreaEntry;
