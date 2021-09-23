import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeSelectAffectedDishes, selectDishIdsToNames } from 'features/menus/dishes/slice';
import { createChoice, updateChoice } from '../actions';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Grid } from '@material-ui/core';
import FormTextField from 'common/components/form/FormTextField';
import FormSelectField from 'common/components/form/FormSelectField';
import FormMultiSelectGroup from 'common/components/form/FormMultiSelectGroup';
import ResponsiveModal from 'common/components/other/ResponsiveModal';

const schema = yup.object({
  name: yup.string('Geben Sie einen Namen ein.').max(255, 'Name zu lang.').required('Name ist erforderlich'),
  desc: yup
    .string('Geben Sie eine Beschreibung ein.')
    .max(255, 'Beschreibung zu lang.')
    .required('Beschreibung ist erforderlich'),
  minRequired: yup.string('Geben Sie an, wieviele Optionen verpflichtend sind.').required('Angabe ist erforderlich.'),
  maxAllowed: yup
    .string('Geben Sie an, wieviele Optionen erlaubt sind.')
    .transform((value) => (isNaN(value) ? '-1' : value))
    .test(
      'maxAllowed',
      'Die maximal erlaubten Optionen muss mindestens so groß sein wie die minimal erlaubten Optionen.',
      function (value) {
        const valid = value > -1 ? value >= this.parent.minRequired : true;
        return valid;
      },
    )
    .required('Angabe ist erforderlich.'),
});

function ChoiceModal({ open, onClose, choice }) {
  const dispatch = useDispatch();
  const selectAffectedDishes = useMemo(makeSelectAffectedDishes, []);
  const affectedDishes = useSelector((state) => selectAffectedDishes(state, choice ? choice.id : null));
  const dishIdsToNames = useSelector(selectDishIdsToNames);

  const { handleSubmit, control, reset, setValue } = useForm({
    mode: 'onTouched',
    defaultValues: {
      name: '',
      desc: '',
      minRequired: 0,
      maxAllowed: 'Keine Einschränkung',
      dishes: [],
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (choice) {
      setValue('name', choice.name);
      setValue('desc', choice.desc);
      setValue('minRequired', choice.minRequired);
      setValue('maxAllowed', choice.maxAllowed === -1 ? 'Keine Einschränkung' : choice.maxAllowed);
      setValue('dishes', affectedDishes);
    }
  }, [open, choice, affectedDishes, setValue]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data) => {
    data.dishes = data.dishes.map((item) => item[0]);
    if (!choice) {
      dispatch(createChoice(data));
    } else {
      dispatch(updateChoice({ ...choice, ...data }));
    }
    handleClose();
  };

  return (
    <ResponsiveModal
      open={open}
      header={choice ? 'Optiongruppe bearbeiten' : 'Optiongruppe erstellen'}
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
          <FormSelectField
            name="minRequired"
            label="Minimal Erforderlich"
            items={['0', '1', '2', '3', '4', '5', '6']}
            control={control}
            fullWidth
          />
        </Grid>
        <Grid item>
          <FormSelectField
            name="maxAllowed"
            label="Maximal Erlaubt"
            items={['Keine Einschränkung', '1', '2', '3', '4', '5', '6']}
            control={control}
            fullWidth
          />
        </Grid>
        <Grid item>
          <FormMultiSelectGroup
            name="dishes"
            group="Speisen"
            label="Zur Speise hinzufügen"
            items={dishIdsToNames}
            control={control}
            fullWidth
          />
        </Grid>
      </Grid>
    </ResponsiveModal>
  );
}

export default ChoiceModal;
