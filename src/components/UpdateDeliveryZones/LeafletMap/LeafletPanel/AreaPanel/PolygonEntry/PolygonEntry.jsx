import React, { useState } from 'react';
import { IconButton, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Delete, Add } from '@material-ui/icons';

import CustomDialog from '../../../../../common/CustomDialog/CustomDialog';
import MinimumOrderValueInput from './MinimumOrderValueInput/MinimumOrderValueInput';
import DeliveryFeeInput from './DeliveryFeeInput/DeliveryFeeInput';

import { wasAreaEdited } from '../../../../../../utils/utils';

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
    polygonHover: {
      '&:hover': {
        backgroundColor: props.color + '77',
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

function PolygonEntry({
  color,
  index,
  minimumOrderValue,
  deliveryFee,
  areaNumber,

  drawMode,
  areas,
  activeArea,

  toggleDrawMode,
  activateArea,
  deactivateArea,
  deleteArea,
  addEmptyPolygon,
  setMinimumOrderValue,
  setDeliveryFee,
}) {
  const classes = useStyles({ color })();
  const [changeZoneDialogOpen, setChangeZoneDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [cancelEditOpen, setCancelEditOpen] = useState(false);

  const handleActivateArea = (event) => {
    // if (activeArea.areaNumber === areaNumber || event.target !== event.currentTarget) {
    //   return;
    // }
    if (activeArea.areaNumber === areaNumber) {
      return;
    }

    if (wasAreaEdited(areas, activeArea)) {
      setChangeZoneDialogOpen(true);
    } else {
      if (drawMode) {
        toggleDrawMode();
      }
      activateArea(areaNumber);
    }
  };

  const handleActivateAreaDialogReject = (event) => {
    setChangeZoneDialogOpen(false);
  };

  const handleActivateAreaDialogAccept = (event) => {
    setChangeZoneDialogOpen(false);
    if (drawMode) {
      toggleDrawMode();
    }
    if (activeArea.areaNumber === areaNumber) {
      deactivateArea();
    } else {
      activateArea(areaNumber);
    }
  };

  const handleAddPolygon = (event) => {
    if (wasAreaEdited(areas, activeArea)) {
      setCancelEditOpen(true);
      return;
    }
    if (!drawMode) {
      activateArea(areaNumber);
      addEmptyPolygon();
    }
    toggleDrawMode();
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

  const handleAddAreaDialogReject = (event) => {
    setCancelEditOpen(false);
  };

  const handleAddAreaDialogAccept = (event) => {
    setCancelEditOpen(false);
    activateArea(areaNumber);
    addEmptyPolygon();
    toggleDrawMode();
  };

  return (
    <React.Fragment key={index}>
      <div
        className={`${classes.polygonContainer} ${
          activeArea.areaNumber === areaNumber ? classes.polygonSelected : classes.polygonHover
        }`}
        onClick={(event) => handleActivateArea(event, areaNumber)}
      >
        <div style={{ backgroundColor: color, flexBasis: '28px', alignSelf: 'stretch' }} />
        <Divider orientation="vertical" flexItem />
        <DeliveryFeeInput setDeliveryFee={setDeliveryFee} deliveryFee={deliveryFee} />
        <Divider orientation="vertical" flexItem style={{ margin: '6px' }} />
        <MinimumOrderValueInput setMinimumOrderValue={setMinimumOrderValue} minimumOrderValue={minimumOrderValue} />
        <Divider orientation="vertical" flexItem style={{ margin: '6px' }} />
        <IconButton size="small" onClick={handleAddPolygon}>
          <Add />
        </IconButton>
        <IconButton size="small" onClick={(event) => setDeleteDialogOpen(true)}>
          <Delete />
        </IconButton>
      </div>
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
      <CustomDialog
        open={cancelEditOpen}
        handleReject={handleAddAreaDialogReject}
        handleAccept={handleAddAreaDialogAccept}
        title="Bearbeitung abbrechen?"
        message="Wenn Sie die Bearbeitung abbrechen, werden alle Veränderungen
          unwiederruflich gelöscht."
      />
    </React.Fragment>
  );
}

export default PolygonEntry;
