import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCoupon, updateCoupon } from '../actions';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Box, Stack } from '@mui/material';
import FormTextField from 'common/components/form/FormTextField';
import FormCheckboxField from 'common/components/form/FormCheckboxField';
import ResponsiveModal from 'common/components/feedback/ResponsiveModal';
import FormPriceField from 'common/components/form/FormPriceField';
import FormDateRange from './FormDateRange';

const schema = yup.object({
  name: yup.string('Geben Sie einen Namen ein.').max(48, 'Name zu lang.').required('Name ist erforderlich'),
  desc: yup.string('Geben Sie eine Beschreibung ein.').max(128, 'Beschreibung zu lang.').optional(),
  value: yup.number('Geben Sie einen Wert ein.').required('Wert ist erforderlich.'),
  minOrderValue: yup.number('Geben Sie einen Mindestbestellwert ein.').required('Mindestbestellwert ist erforderlich.'),
  numberOfCoupons: yup
    .number('Geben Sie die Anzahl zu erstellender Gutscheine ein.')
    .min(1, 'Dieser Wert muss größer als 0 sein.')
    .max(50000, 'Aktuell können nicht mehr als 50000 Gutscheine pro Eintrag erstellt werden.')
    .required('Anzahl ist erforderlich.'),
  date: yup
    .object({
      startDate: yup.number('Geben Sie ein Startdatum ein.').required('Startdatum ist erforderlich'),
      endDate: yup.number('Geben Sie ein Enddatum ein.').required('Enddatum ist erforderlich'),
    })
    .required(),
  isCombinable: yup
    .boolean('Geben Sie an, ob der Rabatt kombinierbar ist.')
    .required('Angabe der Kombinierbarkeit ist erforderlich'),
});

const defaultValues = {
  name: '',
  desc: '',
  isCombinable: false,
  value: 0,
  minOrderValue: 0,
  numberOfCoupons: 1,
  date: {
    startDate: new Date().setHours(0, 0, 0, 0),
    endDate: new Date().setHours(0, 0, 0, 0),
  },
};

function CouponModal({ open, onClose, coupon }) {
  const dispatch = useDispatch();

  const { handleSubmit, control, reset, setValue, formState } = useForm({
    mode: 'onChange',
    defaultValues: coupon ? JSON.parse(JSON.stringify(coupon)) : defaultValues,
    delayError: 300,
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const resetValues = useCallback(() => {
    reset(coupon ? JSON.parse(JSON.stringify(coupon)) : defaultValues);
  }, [coupon, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    if (!coupon) {
      await dispatch(createCoupon(data));
    } else {
      await dispatch(updateCoupon({ ...coupon, ...data }));
    }

    onClose();
  };

  useEffect(() => {
    resetValues();
  }, [resetValues, coupon]);

  const { isValid } = formState;
  return (
    <ResponsiveModal
      open={open}
      header={coupon ? 'Gutscheinaktion bearbeiten' : 'Gutscheinaktion erstellen'}
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
      keepMounted
    >
      <Stack spacing={2}>
        <Box>
          <FormTextField name="name" label="Name*" control={control} fullWidth />
        </Box>
        <Box>
          <FormTextField name="desc" label="Beschreibung" control={control} fullWidth />
        </Box>
        {!coupon ? (
          <React.Fragment>
            <Box>
              <FormPriceField name="value" label="Wert*" control={control} fullWidth />
            </Box>
            <Box>
              <FormPriceField name="minOrderValue" label="Mindestbestellwert*" control={control} fullWidth />
            </Box>
            <Box>
              <FormTextField
                name="numberOfCoupons"
                label="Anzahl*"
                control={control}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                fullWidth
              />
            </Box>
          </React.Fragment>
        ) : null}
        <Box>
          <FormDateRange label="Zeitraum*" control={control} setValue={setValue} />
        </Box>
        {!coupon ? (
          <Box>
            <FormCheckboxField name="isCombinable" label="Kombinierbar*" control={control} />
          </Box>
        ) : null}
      </Stack>
    </ResponsiveModal>
  );
}

export default CouponModal;
