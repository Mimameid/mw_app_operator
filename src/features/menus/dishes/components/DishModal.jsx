import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeSelectAffectedCategories, selectCategoryIdsToNames } from 'features/menus/categories/slice';
import { createDish, updateDish } from '../actions';
import { CUISINE_TYPES, CUISINE_LABELS } from 'common/constants';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Grid } from '@mui/material';
import FormTextField from 'common/components/form/common/FormTextField';
import FormPriceField from 'common/components/form/common/FormPriceField';
import FormSelectField from 'common/components/form/common/FormSelectField';
import FormCheckboxField from 'common/components/form/common/FormCheckboxField';
import FormMultiSelectGroup from 'common/components/form/menu/FormMultiSelectGroup';
import FormTagMultiSelect from 'common/components/form/menu/FormMultiSelectLabel';
import ResponsiveModal from 'common/components/feedback/ResponsiveModal';

const schema = yup.object({
  name: yup.string('Geben Sie einen Namen ein.').max(48, 'Name zu lang.').required('Name ist erforderlich'),
  desc: yup
    .string('Geben Sie eine Beschreibung ein.')
    .max(128, 'Beschreibung zu lang.')
    .required('Beschreibung ist erforderlich'),
  price: yup.number('Geben Sie einen Preis ein.').required('Preis ist erforderlich.'),
  cuisineType: yup
    .string('Wählen Sie einen Typen aus.')
    .oneOf(CUISINE_TYPES, 'Typ muss aus der vorgegebenen Liste ausgewählt werden')
    .required('Typ ist erforderlich'),
  cuisineLabels: yup
    .array('Wählen Sie Labels aus.')
    .of(yup.string().oneOf(CUISINE_LABELS, 'Labels müssen aus der vorgegebenen Liste ausgewählt werden')),
  isAvailable: yup
    .boolean('Geben Sie an, ob die Speise verfügbar ist.')
    .required('Angabe der Verfügbarkeit ist erforderlich'),
});

const defaultValues = {
  name: '',
  desc: '',
  cuisineType: 'Burger',
  isAvailable: true,
  price: 0,
  categories: [],
  cuisineLabels: [],
};

function DishModal({ open, onClose, dish }) {
  const dispatch = useDispatch();
  const selectAffectedCategories = useMemo(makeSelectAffectedCategories, []);
  const affectedCategories = useSelector((state) => selectAffectedCategories(state, dish ? dish.id : null));
  const categoryIdsToNames = useSelector(selectCategoryIdsToNames);
  const [loading, setLoading] = useState(false);

  const { handleSubmit, control, reset, formState } = useForm({
    mode: 'onChange',
    defaultValues: dish ? { ...dish, categories: affectedCategories } : defaultValues,
    delayError: 500,
    resolver: yupResolver(schema),
  });

  const resetValues = useCallback(() => {
    reset(dish ? { ...dish, categories: affectedCategories } : defaultValues);
  }, [dish, affectedCategories, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    data.categories = data.categories.map((item) => item[0]);
    if (!dish) {
      await dispatch(createDish(data));
    } else {
      await dispatch(updateDish({ ...dish, ...data }));
    }

    onClose();
  };

  useEffect(() => {
    resetValues();
  }, [resetValues, dish]);

  const { isValid } = formState;
  return (
    <ResponsiveModal
      open={open}
      header={dish ? 'Speise bearbeiten' : 'Speise erstellen'}
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
        <Grid item>
          <FormSelectField name="cuisineType" label="Typ*" items={CUISINE_TYPES} control={control} fullWidth />
        </Grid>
        <Grid item>
          <FormPriceField name="price" label="Preis*" control={control} fullWidth />
        </Grid>
        <Grid item>
          <FormTagMultiSelect name="cuisineLabels" label="Labels" items={CUISINE_LABELS} control={control} />
        </Grid>
        <Grid item>
          <FormMultiSelectGroup
            name="categories"
            label="Zur Kategorie hinzufügen"
            group="Kategorien"
            items={categoryIdsToNames}
            control={control}
          />
        </Grid>
        <Grid item>
          <FormCheckboxField name="isAvailable" label="Verfügbar" control={control} />
        </Grid>
      </Grid>
    </ResponsiveModal>
  );
}

export default DishModal;
