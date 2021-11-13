import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deactivateArea, fetchAreas, updateAreas } from 'features/deliveryAreas/areas/actions';
import { reset } from 'features/mode/actions';
import useOnBeforeUnload from 'common/hooks/useOnBeforeUnload';

import { Box, Button, Paper, Toolbar } from '@mui/material';
import LeafletMap from 'features/deliveryAreas/areas/components/LeafletMap';
import LoadingScreen from './LoadingScreen';
import ContentHeader from 'common/components/dataDisplay/ContentHeader';
import AlertDialog from 'common/components/feedback/AlertDialog';
import { CloudUpload } from '@mui/icons-material';

function DeliveryAreas({ name }) {
  const dispatch = useDispatch();
  const { areas, changed } = useSelector((state) => ({
    areas: state.deliveryAreas.areas,
    changed: state.mode.changed,
  }));

  useOnBeforeUnload();

  const [dataLoaded, setDataLoaded] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const promiseAreas = dispatch(fetchAreas());

    promiseAreas.then(() => {
      setDataLoaded(true);
    });

    return () => {
      dispatch(deactivateArea());
      dispatch(reset());
    };
  }, [dispatch]);

  const handleRejectDialog = (event) => {
    setDialogOpen(false);
  };

  const handleAcceptDialog = async (event) => {
    setDialogOpen(false);
    setSaving(true);

    await dispatch(updateAreas(areas));
  };

  return dataLoaded ? (
    <Box
      sx={{
        height: '100vh',

        p: 3,
        pt: 0,
      }}
      display="flex"
      flexDirection="column"
      flexGrow={1}
    >
      <Toolbar />
      <Box display="flex" flexDirection="column" flexGrow={1} alignItems="stretch">
        <Box display="flex" justifyContent="space-between">
          <ContentHeader name={name} info="Erstellen Sie Ihre Liefergebiete und setzen sie die Lieferkosten fest." />
          <Box alignSelf="flex-end">
            <Button
              sx={{
                fontSize: 'body1.fontSize',
                mb: 3,
                textTransform: 'none',
              }}
              onClick={() => {
                if (changed) {
                  setDialogOpen(true);
                }
              }}
              variant="contained"
              color="primary"
              startIcon={<CloudUpload />}
              disabled={!changed}
            >
              Speichern
            </Button>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Paper sx={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }} elevation={2}>
            <LeafletMap />
          </Paper>
        </Box>
      </Box>
      <AlertDialog
        open={dialogOpen}
        handleReject={handleRejectDialog}
        handleAccept={handleAcceptDialog}
        title="Änderungen speichern?"
        message="Sind Sie sicher, dass Sie Ihre Änderungen speichern wollen?"
        loading={saving}
        TransitionProps={{
          onExited: () => {
            setSaving(false);
          },
        }}
      />
    </Box>
  ) : (
    <LoadingScreen />
  );
}

export default DeliveryAreas;
