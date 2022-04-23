import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createOffer, updateOffer } from '../actions';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Grid } from '@mui/material';
import FormTextField from 'common/components/form/FormTextField';
import ResponsiveModal from 'common/components/feedback/ResponsiveModal';

const schema = yup.object({
  name: yup.string('Geben Sie einen Namen ein.').max(48, 'Name zu lang.').required('Name ist erforderlich'),
  desc: yup
    .string('Geben Sie eine Beschreibung ein.')
    .max(128, 'Beschreibung zu lang.')
    .required('Beschreibung ist erforderlich'),
});

const defaultValues = {
  name: '',
  desc: '',
};

function OfferModal({ open, onClose, offer }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { handleSubmit, control, reset, formState } = useForm({
    mode: 'onChange',
    defaultValues: offer ? offer : defaultValues,
    delayError: 300,
    resolver: yupResolver(schema),
  });

  const resetValues = useCallback(() => {
    reset(offer ? offer : defaultValues);
  }, [offer, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    if (!offer) {
      await dispatch(createOffer({ ...data, isActive: false }));
    } else {
      await dispatch(updateOffer({ ...offer, ...data }));
    }

    onClose();
  };

  useEffect(() => {
    resetValues();
  }, [resetValues, offer]);

  const { isValid } = formState;
  return (
    <ResponsiveModal
      open={open}
      header={offer ? 'Speisekarte bearbeiten' : 'Speisekarte erstellen'}
      acceptLabel={'Speichern'}
      onCancel={onClose}
      onAccept={handleSubmit(onSubmit)}
      disabled={!isValid}
      loading={loading}
      TransitionProps={{
        onExited: () => {
          resetValues();
          setLoading(false);
        },
      }}
    >
      <Grid container spacing={2} direction="column">
        <Grid item>
          <FormTextField name="name" label="Name*" control={control} fullWidth />
        </Grid>
        <Grid item>
          <FormTextField name="desc" label="Beschreibung*" control={control} fullWidth />
        </Grid>
      </Grid>
    </ResponsiveModal>
  );
}

export default OfferModal;
