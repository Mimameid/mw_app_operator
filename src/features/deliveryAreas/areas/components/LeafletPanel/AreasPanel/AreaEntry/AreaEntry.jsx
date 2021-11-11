import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  activateArea,
  addEmptyPolygon,
  deactivateArea,
  removeArea,
  setDeliveryFee,
  setMinOrderValue,
} from 'features/deliveryAreas/areas/actions';
import { setDraw } from 'features/mode/actions';

import { useMap } from 'react-leaflet';
import { Box, IconButton, Divider } from '@mui/material';
import CustomDialog from 'common/components/feedback/CustomDialog';
import MinimumOrderValueInput from './MinimumOrderValueInput';
import DeliveryFeeInput from './DeliveryFeeInput';
import { Delete, Add } from '@mui/icons-material';

function AreaEntry({ color, index, minOrderValue, deliveryFee, areaNumber }) {
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
      dispatch(setMinOrderValue({ value: value, areaNumber: areaNumber }));
    }
  };

  return (
    <React.Fragment key={index}>
      <Box
        sx={{
          direction: 'ltr',
          display: 'flex',
          alignItems: 'center',
          bgcolor: activeArea.areaNumber === areaNumber ? color + '55' : '',
        }}
        ref={polygonContainer}
      >
        <Box
          sx={{
            backgroundColor: color,
            flexBasis: '28px',
            alignSelf: 'stretch',
            '&:hover': {
              cursor: 'pointer',
            },
          }}
          onClick={(event) => handleActivateArea(event, areaNumber)}
        />

        <Divider orientation="vertical" flexItem />
        <DeliveryFeeInput onChangeDeliveryFee={onChangeDeliveryFee} deliveryFee={deliveryFee} />
        <Divider orientation="vertical" flexItem style={{ margin: '6px' }} />
        <MinimumOrderValueInput onChangeOrderValue={onChangeOrderValue} minOrderValue={minOrderValue} />
        <Divider orientation="vertical" flexItem style={{ margin: '6px' }} />
        <IconButton size="small" onClick={handleAddPolygon}>
          <Add fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={(event) => setDeleteDialogOpen(true)}>
          <Delete fontSize="small" />
        </IconButton>
      </Box>

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
