import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeArea } from 'features/deliveryAreas/areas/actions';

import { Divider, Paper } from '@mui/material';
import AreaEntry from './AreaEntry/AreaEntry';
import AlertDialog from 'common/components/feedback/AlertDialog';
import { selectUiMode } from 'features/frame';

function AreasPanel() {
  const dispatch = useDispatch();
  const { draw, edited } = useSelector(selectUiMode);
  const { areas, areaNumber } = useSelector((state) => ({
    areas: state.deliveryAreas.areas.areas,
    areaNumber: state.deliveryAreas.areas.activeArea.areaNumber,
  }));

  const panelRef = useRef();

  useEffect(() => {
    panelRef.current.style.display = edited || draw ? 'none' : 'block';
  }, [draw, edited]);

  const [loading, setLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const areaNumberRef = useRef(null);

  const deleteHandler = useCallback((areaNumber) => {
    areaNumberRef.current = areaNumber;
    setDeleteDialogOpen(true);
  }, []);

  const handleDeleteDialogAccept = async (event) => {
    setLoading(true);
    await dispatch(removeArea(areaNumberRef.current));
    setDeleteDialogOpen(false);
  };

  return (
    <Paper
      sx={{
        overflow: 'hidden',
        position: 'relative',
        marginTop: '10px',
        width: '200px',
      }}
      ref={panelRef}
    >
      {areas.map((area, index) => (
        <React.Fragment key={area.areaNumber}>
          <AreaEntry
            color={area.color}
            minOrderValue={area.minOrderValue}
            deliveryFee={area.deliveryFee}
            areaNumber={area.areaNumber}
            currentAreaNumber={areaNumber}
            deleteHandler={deleteHandler}
          />
          {index !== areas.length - 1 ? <Divider /> : null}
        </React.Fragment>
      ))}
      <AlertDialog
        open={deleteDialogOpen}
        title="Gebiet löschen?"
        message="Sind Sie sicher, dass Sie das Gebiet löschen wollen?"
        handleReject={() => {
          setDeleteDialogOpen(false);
        }}
        handleAccept={handleDeleteDialogAccept}
        loading={loading}
        TransitionProps={{
          onExited: () => {
            setLoading(false);
          },
        }}
      />
    </Paper>
  );
}

export default AreasPanel;
