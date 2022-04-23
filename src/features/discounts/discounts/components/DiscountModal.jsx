import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createDiscount, updateDiscount } from '../actions';
import { discountTypes, weekdays } from 'common/constants';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Box, Paper, Stack } from '@mui/material';
import FormTextField from 'common/components/form/FormTextField';
import FormCheckboxField from 'common/components/form/FormCheckboxField';
import FormWeekdayField from './FormWeekdayField';
import FormDateRange from './FormDateRange';
import FormTimeRange from './FormTimeRange';
import ResponsiveModal from 'common/components/feedback/ResponsiveModal';
import FormDiscount from './FormDiscount';
import FormDiscountScope from './FormDiscountScope';

const schema = yup.object({
  name: yup.string('Geben Sie einen Namen ein.').max(48, 'Name zu lang.').required('Name ist erforderlich'),
  desc: yup.string('Geben Sie eine Beschreibung ein.').max(128, 'Beschreibung zu lang.').optional(),

  scope: yup
    .object({
      items: yup
        .array('Geben Sie die betroffenen Items an.')
        .of(yup.array().of(yup.string()))
        .min(1, 'Es muss mindestens 1 Item ausgewählt werden.')
        .required('Betroffene Items sind erforderlich.'),
      itemType: yup.string('Geben Sie an, welcher Typ betroffen ist.').oneOf(Object.keys(discountTypes)).required(),
    })
    .required(),

  isFixedPrice: yup.boolean('Geben Sie an, ob es ein Festpreis ist.').required('Angabe ist erforderlich.'),
  fixedPrice: yup.number('Geben Sie die Höhe des Festpreises ein.').required('Festpreis ist erforderlich.'),
  reduction: yup.number('Geben Sie die Höhe des Nachlasses ein.').required('Nachlass ist erforderlich.'),
  isPercental: yup
    .boolean('Geben Sie an, ob der Nachlass prozentual ist.')
    .required('Angabe des Typs des Nachlasses ist erforderlich'),
  minOrderValue: yup.number('Geben Sie einen Mindestbestellwert ein.').required('Mindestbestellwert ist erforderlich.'),
  isRepeating: yup.boolean('Geben Sie an, ob der Nachlass wiederkehrend ist.').required('Angabe ist erforderlich'),
  date: yup
    .object({
      startDate: yup.number('Geben Sie ein Startdatum ein.').required('Startdatum ist erforderlich'),
      endDate: yup.number('Geben Sie ein Enddatum ein.').required('Enddatum ist erforderlich'),
    })
    .when('repeating', {
      is: false,
      then: yup.object().required(),
    }),
  weekdays: yup
    .array()
    .of(yup.string().oneOf(Object.keys(weekdays), 'Wochentag muss aus den gegebenen Optionen ausgewählt werden.')),
  isAllDay: yup.boolean('Geben Sie an, ob der Nachlass ganztätig ist.').required('Angabe ist erforderlich'),
  timeRange: yup
    .object({
      startTime: yup.string('Geben Sie die Startzeit an.').required('Startzeit erforderlich'),
      endTime: yup.string('Geben Sie die Endzeit an.').required('Endzeit erforderlich'),
    })
    .test('overlap test', 'Endzeit muss größer als Startzeit sein.', function (value, context) {
      try {
        const timeStart = this.originalValue.startTime.substring(0, 2) + this.originalValue.startTime.substring(3, 5);
        const timeEnd = this.originalValue.endTime.substring(0, 2) + this.originalValue.endTime.substring(3, 5);
        return timeStart < timeEnd;
      } catch (error) {
        return false;
      }
    })
    .when('isAllDay', {
      is: false,
      then: yup.object().required(),
    })
    .required(),
  isCombinable: yup
    .boolean('Geben Sie an, ob der Rabatt kombinierbar ist.')
    .required('Angabe der Kombinierbarkeit ist erforderlich'),
});

const defaultValues = {
  isActive: false,
  name: '',
  desc: '',
  isCombinable: false,

  isFixedPrice: false,
  fixedPrice: 0,
  isPercental: false,
  reduction: 0,
  minOrderValue: 0,

  isRepeating: false,
  date: {
    startDate: new Date().setHours(0, 0, 0, 0),
    endDate: new Date().setHours(0, 0, 0, 0),
  },

  weekdays: Object.keys(weekdays),

  isAllDay: true,
  timeRange: {
    startTime: '06:00',
    endTime: '10:00',
  },
  scope: {
    itemType: discountTypes.offer,
    items: [],
  },
};

function DiscountModal({ open, onClose, discount }) {
  const dispatch = useDispatch();
  const { handleSubmit, control, reset, setValue, watch, formState } = useForm({
    mode: 'onChange',
    defaultValues: discount ? JSON.parse(JSON.stringify(discount)) : defaultValues,
    delayError: 300,
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const watchRepeating = watch('isRepeating');
  const watchAllDay = watch('isAllDay');
  const watchPercental = watch('isPercental');
  const watchIsFixedPrice = watch('isFixedPrice');
  const watchType = watch('scope.itemType');

  const resetValues = useCallback(() => {
    reset(discount ? JSON.parse(JSON.stringify(discount)) : defaultValues);
  }, [discount, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    if (!discount) {
      await dispatch(createDiscount(data));
    } else {
      await dispatch(updateDiscount({ ...discount, ...data }));
    }

    onClose();
  };

  useEffect(() => {
    resetValues();
  }, [resetValues, discount]);

  const { isValid } = formState;
  return (
    <ResponsiveModal
      open={open}
      header={discount ? 'Rabattaktion bearbeiten' : 'Rabattaktion erstellen'}
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
      <Stack spacing={2}>
        <Box>
          <FormTextField name="name" label="Name*" control={control} fullWidth />
        </Box>
        <Box>
          <FormTextField name="desc" label="Beschreibung" control={control} fullWidth />
        </Box>
        <Box>
          <FormDiscountScope type={watchType} control={control} setValue={setValue} />
        </Box>

        <Box>
          <FormDiscount
            control={control}
            isFixedPrice={watchIsFixedPrice}
            isPercental={watchPercental}
            setValue={setValue}
          />
        </Box>

        <Box>
          <Paper variant="outlined">
            <FormDateRange label={'Zeitraum*'} control={control} isRepeating={watchRepeating} setValue={setValue} />

            <FormWeekdayField name="weekdays" control={control} setValue={setValue} />
            <FormTimeRange control={control} isAllDay={watchAllDay} setValue={setValue} />
          </Paper>
        </Box>

        <Box>
          <FormCheckboxField name="isCombinable" label="Kombinierbar" control={control} />
        </Box>
      </Stack>
    </ResponsiveModal>
  );
}

export default DiscountModal;
