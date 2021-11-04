import React, { useEffect } from 'react';
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
import FormEffectedItems from './FormEffectedItems';

const schema = yup.object({
  name: yup.string('Geben Sie einen Namen ein.').max(48, 'Name zu lang.').required('Name ist erforderlich'),
  desc: yup.string('Geben Sie eine Beschreibung ein.').max(48, 'Beschreibung zu lang.').optional(),
  type: yup.string('Geben Sie an, welcher Typ betroffen ist.').oneOf(Object.keys(discountTypes)).required(),
  effectedItems: yup
    .array('Geben Sie die betroffenen Items an.')
    .of(yup.array().of(yup.string()))
    .min(1, 'Es muss mindestens 1 Item ausgewählt werden.')
    .required('Betroffene Items sind erforderlich.'),
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
  time: yup
    .object({
      startTime: yup.string('Geben Sie die Startzeit an.').required('Startzeit erforderlich'),
      endTime: yup.string('Geben Sie die Endzeit an.').required('Endzeit erforderlich'),
    })
    .test('overlap test', 'Endzeit muss größer als Startzeit sein.', function () {
      const timeStart = this.originalValue.startTime.substring(0, 2) + this.originalValue.startTime.substring(3, 5);
      const timeEnd = this.originalValue.endTime.substring(0, 2) + this.originalValue.endTime.substring(3, 5);
      return timeStart < timeEnd;
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

function DiscountModal({ open, onClose, discount }) {
  const dispatch = useDispatch();

  const { handleSubmit, control, reset, setValue, watch } = useForm({
    mode: 'onTouched',
    defaultValues: {
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

      isAllDay: false,
      time: {
        startTime: '06:00',
        endTime: '10:00',
      },

      type: discountTypes.menu,
      effectedItems: [],
    },
    resolver: yupResolver(schema),
  });

  const watchRepeating = watch('isRepeating');
  const watchAllDay = watch('isAllDay');
  const watchPercental = watch('isPercental');
  const watchIsFixedPrice = watch('isFixedPrice');
  const watchType = watch('type');

  useEffect(() => {
    if (discount) {
      setValue('isActive', discount.isActive);
      setValue('name', discount.name);
      setValue('desc', discount.desc);
      setValue('isCombinable', discount.isCombinable);
      setValue('isFixedPrice', discount.isFixedPrice);
      setValue('fixedPrice', discount.fixedPrice);
      setValue('isPercental', discount.isPercental);
      setValue('reduction', discount.reduction);
      setValue('minOrderValue', discount.minOrderValue);
      setValue('isRepeating', discount.isRepeating);
      setValue('date.startDate', discount.date.startDate);
      setValue('date.endDate', discount.date.endDate);
      setValue('weekdays', discount.weekdays);
      setValue('isAllDay', discount.isAllDay);
      setValue('time.startTime', discount.time.startTime);
      setValue('time.endTime', discount.time.endTime);
      setValue('type', discount.type);
      setValue('effectedItems', discount.effectedItems);
    }
    return () => {
      reset();
    };
  }, [open, discount, setValue, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data) => {
    if (!discount) {
      dispatch(createDiscount(data));
    } else {
      dispatch(updateDiscount({ ...discount, ...data }));
    }

    handleClose();
  };

  return (
    <ResponsiveModal
      open={open}
      header={discount ? 'Rabattaktion bearbeiten' : 'Rabattaktion erstellen'}
      acceptLabel={'Speichern'}
      onCancel={handleClose}
      onAccept={handleSubmit(onSubmit)}
    >
      <Stack spacing={2}>
        <Box>
          <FormTextField name="name" label="Name" control={control} fullWidth />
        </Box>
        <Box>
          <FormTextField name="desc" label="Beschreibung" control={control} fullWidth />
        </Box>
        <Box>
          <FormEffectedItems control={control} type={watchType} setValue={setValue} />
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
            <FormDateRange control={control} isRepeating={watchRepeating} setValue={setValue} />

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
