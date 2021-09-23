import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createDiscount, updateDiscount } from '../actions';
import { discountTypes, weekdays } from 'common/constants';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Grid, Paper } from '@material-ui/core';
import FormTextField from 'common/components/form/FormTextField';
import FormCheckboxField from 'common/components/form/FormCheckboxField';
import FormWeekdayField from './FormWeekdayField';
import FormDateRange from './FormDateRange';
import FormTimeRange from './FormTimeRange';
import ResponsiveModal from 'common/components/other/ResponsiveModal';
import FormDiscount from './FormDiscount';
import FormEffectedItems from './FormEffectedItems';

const schema = yup.object({
  name: yup.string('Geben Sie einen Namen ein.').max(255, 'Name zu lang.').required('Name ist erforderlich'),
  desc: yup.string('Geben Sie eine Beschreibung ein.').max(255, 'Beschreibung zu lang.').optional(),
  type: yup.string('Geben Sie an, welcher Typ betroffen ist.').oneOf(Object.keys(discountTypes)).required(),
  effectedItems: yup
    .array('Geben Sie die betroffenen Items an.')
    .of(yup.array().of(yup.string()))
    .min(1, 'Es muss mindestens 1 Item ausgewählt werden.')
    .required('Betroffene Items sind erforderlich.'),
  isFixedPrice: yup.boolean('Geben Sie an, ob es ein Festpreis ist.').required('Angabe ist erforderlich.'),
  fixedPrice: yup
    .string('Geben Sie die Höhe des Festpreises ein.')
    .trim()
    .matches(/\d+,\d{2}/, 'Der Preis muss eine Dezimalzahl sein.')
    .required('Festpreis ist erforderlich.'),
  reduction: yup
    .string('Geben Sie die Höhe des Nachlasses ein.')
    .trim()
    .matches(/\d+,\d{2}/, 'Der Nachlass muss eine Dezimalzahl sein.')
    .required('Nachlass ist erforderlich.'),
  percental: yup
    .boolean('Geben Sie an, ob der Nachlass prozentual ist.')
    .required('Angabe des Typs des Nachlasses ist erforderlich'),

  minOrderValue: yup
    .string('Geben Sie einen Mindestbestellwert ein.')
    .trim()
    .matches(/\d+,\d{2}/, 'Der Mindestbestellwert muss eine Dezimalzahl sein.')
    .required('Mindestbestellwert ist erforderlich.'),

  repeating: yup.boolean('Geben Sie an, ob der Nachlass wiederkehrend ist.').required('Angabe ist erforderlich'),
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
  allDay: yup.boolean('Geben Sie an, ob der Nachlass ganztätig ist.').required('Angabe ist erforderlich'),
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
    .when('allDay', {
      is: false,
      then: yup.object().required(),
    })
    .required(),
  combinable: yup
    .boolean('Geben Sie an, ob der Rabatt kombinierbar ist.')
    .required('Angabe der Kombinierbarkeit ist erforderlich'),
});

function DiscountModal({ open, onClose, discount }) {
  const dispatch = useDispatch();

  const { handleSubmit, control, reset, setValue, watch } = useForm({
    mode: 'onTouched',
    defaultValues: {
      active: false,
      name: '',
      desc: '',
      combinable: true,

      isFixedPrice: false,
      fixedPrice: '00,00',
      percental: false,
      reduction: '00,00',
      minOrderValue: '00,00',

      repeating: false,
      date: {
        startDate: Date.now(),
        endDate: Date.now(),
      },

      weekdays: Object.keys(weekdays),

      allDay: false,
      time: {
        startTime: '06:00',
        endTime: '10:00',
      },

      type: discountTypes.menu,
      effectedItems: [],
    },
    resolver: yupResolver(schema),
  });
  const watchRepeating = watch('repeating');
  const watchAllDay = watch('allDay');
  const watchPercental = watch('percental');
  const watchIsFixedPrice = watch('isFixedPrice');
  const watchType = watch('type');

  useEffect(() => {
    if (discount) {
      setValue('active', discount.active);
      setValue('name', discount.name);
      setValue('desc', discount.desc);
      setValue('combinable', discount.combinable);
      setValue('isFixedPrice', discount.isFixedPrice);
      setValue('fixedPrice', discount.fixedPrice);
      setValue('percental', discount.percental);
      setValue('reduction', discount.reduction);
      setValue('minOrderValue', discount.minOrderValue);
      setValue('repeating', discount.repeating);
      setValue('date.startDate', discount.date.startDate);
      setValue('date.endDate', discount.date.endDate);
      setValue('weekdays', discount.weekdays);
      setValue('allDay', discount.allDay);
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
      header={discount ? 'Rabatt bearbeiten' : 'Rabatt erstellen'}
      acceptLabel={'Speichern'}
      onCancel={handleClose}
      onAccept={handleSubmit(onSubmit)}
    >
      <Grid container spacing={2} direction="column">
        <Grid item>
          <FormTextField name="name" label="Name" control={control} fullWidth />
        </Grid>
        <Grid item>
          <FormTextField name="desc" label="Beschreibung" control={control} fullWidth />
        </Grid>
        <Grid item>
          <FormEffectedItems control={control} type={watchType} setValue={setValue} />
        </Grid>

        <Grid item>
          <FormDiscount
            control={control}
            isFixedPrice={watchIsFixedPrice}
            percental={watchPercental}
            setValue={setValue}
          />
        </Grid>

        <Grid item>
          <Paper variant="outlined">
            <FormDateRange control={control} repeating={watchRepeating} setValue={setValue} />

            <FormWeekdayField name="weekdays" control={control} setValue={setValue} />
            <FormTimeRange control={control} allDay={watchAllDay} setValue={setValue} />
          </Paper>
        </Grid>

        <Grid item>
          <FormCheckboxField name="combinable" label="Kombinierbar" control={control} />
        </Grid>
      </Grid>
    </ResponsiveModal>
  );
}

export default DiscountModal;
