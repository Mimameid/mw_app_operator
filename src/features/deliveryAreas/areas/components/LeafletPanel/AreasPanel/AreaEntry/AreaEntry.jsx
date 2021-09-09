import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  activateArea,
  addEmptyPolygon,
  deactivateArea,
  removeArea,
  setDeliveryFee,
  setMinimumOrderValue,
} from 'features/deliveryAreas/areas/actions';
import { setDraw } from 'features/mode/actions';

import { useMap } from 'react-leaflet';
import { IconButton, Divider, makeStyles } from '@material-ui/core';
import CustomDialog from 'common/components/dialogs/CustomDialog';
import MinimumOrderValueInput from './MinimumOrderValueInput';
import DeliveryFeeInput from './DeliveryFeeInput';
import { Delete, Add } from '@material-ui/icons';

const useStyles = (props) => {
  return makeStyles((theme) => ({
    polygonContainer: {
      direction: 'ltr',
      display: 'flex',
      alignItems: 'center',
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

function AreaEntry({ color, index, minimumOrderValue, deliveryFee, areaNumber }) {
  const classes = useStyles({ color })();
  const dispatch = useDispatch();
  const { activeArea, areas } = useSelector((state) => ({
    areas: state.deliveryAreas.areas.areas,
    activeArea: state.deliveryAreas.areas.activeArea,
  }));
  const map = useMap();
  const polygonContainer = useRef();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleActivateArea = (event) => {
    if (activeArea.areaNumber === areaNumber) {
      dispatch(deactivateArea());
    } else {
      dispatch(activateArea({ areaNumber }));
      const center = areas.find((area) => area.areaNumber === areaNumber).center;
      map.flyTo(center, 11, {
        animate: true,
        duration: 0.5,
      });
    }
  };

  const handleAddPolygon = (event) => {
    event.stopPropagation();

    dispatch(activateArea({ areaNumber }));
    dispatch(addEmptyPolygon());
    dispatch(setDraw(true));
  };

  const handleDeleteDialogReject = (event) => {
    setDeleteDialogOpen(false);
  };

  const handleDeleteDialogAccept = (event) => {
    if (activeArea.areaNumber === areaNumber) {
      dispatch(deactivateArea());
    }
    dispatch(removeArea(areaNumber));
    setDeleteDialogOpen(false);
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
      dispatch(setDeliveryFee({ value: value, areaNumber: areaNumber }));
    }
  };
  const onChangeOrderValue = (event) => {
    let value = event.target.value;
    if (!value) {
      value = 0;
    }

    value = Number(value);
    if (value > -1 && value < 100) {
      dispatch(setMinimumOrderValue({ value: value, areaNumber: areaNumber }));
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
        open={deleteDialogOpen}
        title="Gebiet löschen?"
        message="Sind Sie sicher, dass Sie das Gebiet löschen wollen?"
        handleReject={handleDeleteDialogReject}
        handleAccept={handleDeleteDialogAccept}
      />
    </React.Fragment>
  );
}

export default AreaEntry;
