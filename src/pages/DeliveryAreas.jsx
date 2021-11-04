import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deactivateArea, fetchAreas, updateAreas } from 'features/deliveryAreas/areas/actions';
import { fetchShop } from 'features/shop/shop/actions';
import { reset } from 'features/mode/actions';
import useOnBeforeUnload from 'common/hooks/useOnBeforeUnload';

import { Box, Toolbar } from '@mui/material';
import LeafletMap from 'features/deliveryAreas/areas/components/LeafletMap';
import LoadingScreen from './LoadingScreen';
import ContentHeader from 'common/components/dataDisplay/ContentHeader';
import LoadingButton from 'common/components/inputs/LoadingButton';
import CustomDialog from 'common/components/feedback/CustomDialog';
import { CloudUpload } from '@mui/icons-material';

function DeliveryAreas({ name }) {
  const dispatch = useDispatch();
  const areas = useSelector((state) => state.deliveryAreas.areas);
  useOnBeforeUnload();

  const [dataLoaded, setDataLoaded] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const promiseAreas = dispatch(fetchAreas());
    const promiseShop = dispatch(fetchShop());
    Promise.all([promiseAreas, promiseShop]).then(() => {
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
    setLoading(true);
    await dispatch(updateAreas(areas));
    setLoading(false);
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
            <LoadingButton
              sx={{
                fontSize: 'body1.fontSize',
                mb: 3,
                textTransform: 'none',
              }}
              onClick={() => setDialogOpen(true)}
              loading={loading}
              loadingText={'Speichere...'}
              variant="contained"
              color="primary"
              startIcon={<CloudUpload />}
              disabled={areas.areas.length < 1}
            >
              Speichern
            </LoadingButton>
          </Box>
        </Box>

        <LeafletMap />
      </Box>
      <CustomDialog
        open={dialogOpen}
        handleReject={handleRejectDialog}
        handleAccept={handleAcceptDialog}
        title="Änderungen speichern?"
        message="Sind Sie sicher, dass Sie Ihre Änderungen speichern wollen?"
      />
    </Box>
  ) : (
    <LoadingScreen />
  );
}

export default DeliveryAreas;
