import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deactivateArea, fetchAreas, updateAreas } from 'features/deliveryAreas/areas/actions';
import { reset } from 'features/mode/actions';
import { useOnBeforeUnload } from 'common/hooks/useOnBeforeUnload';

import { Box, Toolbar, makeStyles } from '@material-ui/core';
import LeafletMap from 'features/deliveryAreas/areas/components/LeafletMap';
import LoadingScreen from './LoadingScreen';
import ContentHeader from 'common/components/ContentHeader';
import LoadingButton from 'common/components/buttons/LoadingButton';
import CustomDialog from 'common/components/dialogs/CustomDialog';
import { CloudUpload } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',

    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  uploadButton: {
    fontSize: theme.typography.body1.fontSize,
    marginBottom: theme.spacing(3),
    textTransform: 'none',
  },
}));

function DeliveryAreas({ name }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const areas = useSelector((state) => state.deliveryAreas.areas);
  useOnBeforeUnload();

  const [dataLoaded, setDataLoaded] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const promise = dispatch(fetchAreas());
    promise.then(() => {
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
    <Box className={classes.root} display="flex" flexDirection="column" flexGrow={1}>
      <Toolbar />
      <Box display="flex" flexDirection="column" flexGrow={1} alignItems="stretch">
        <Box display="flex" justifyContent="space-between">
          <ContentHeader name={name} info="Erstellen Sie Ihre Liefergebiete und setzen sie die Lieferkosten fest." />
          <Box alignSelf="flex-end">
            <LoadingButton
              className={classes.uploadButton}
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
