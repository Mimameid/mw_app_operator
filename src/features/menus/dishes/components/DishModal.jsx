import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeSelectAffectedCategories, selectCategoryIdsToNames } from 'features/menus/categories/slice';
import { createDish, updateDish } from '../actions';
import { CUISINE_TYPES, CUISINE_LABELS } from 'common/constants';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Grid } from '@material-ui/core';
import FormTextField from 'common/components/form/FormTextField';
import FormPriceField from 'common/components/form/FormPriceField';
import FormSelectField from 'common/components/form/FormSelectField';
import FormCheckboxField from 'common/components/form/FormCheckboxField';
import FormMultiSelectGroup from 'common/components/form/FormMultiSelectGroup';
import FormTagMultiSelect from 'common/components/form/FormTagMultiSelect';
import ResponsiveModal from 'common/components/other/ResponsiveModal';

const schema = yup.object({
  name: yup.string('Geben Sie einen Namen ein.').max(255, 'Name zu lang.').required('Name ist erforderlich'),
  desc: yup
    .string('Geben Sie eine Beschreibung ein.')
    .max(255, 'Beschreibung zu lang.')
    .required('Beschreibung ist erforderlich'),
  price: yup
    .string('Geben Sie einen Preis ein.')
    .trim()
    .matches(/\d+,\d{2}/, 'Der Preis muss eine Dezimalzahl sein.')
    .required('Preis ist erforderlich.'),
  cuisineType: yup
    .string('Wählen Sie einen Typen aus.')
    .oneOf(CUISINE_TYPES, 'Typ muss aus der vorgegebenen Liste ausgewählt werden')
    .required('Typ ist erforderlich'),
  cuisineLabels: yup
    .array('Wählen Sie Labels aus.')
    .of(yup.string().oneOf(CUISINE_LABELS, 'Labels müssen aus der vorgegebenen Liste ausgewählt werden')),
  available: yup
    .boolean('Geben Sie an, ob die Speise verfügbar ist.')
    .required('Angabe der Verfügbarkeit ist erforderlich'),
});

function DishModal({ open, onClose, dish }) {
  const dispatch = useDispatch();
  const selectAffectedCategories = useMemo(makeSelectAffectedCategories, []);
  const affectedCategories = useSelector((state) => selectAffectedCategories(state, dish ? dish.id : null));
  const categoryIdsToNames = useSelector(selectCategoryIdsToNames);

  const { handleSubmit, control, reset, setValue } = useForm({
    mode: 'onTouched',
    defaultValues: {
      name: '',
      desc: '',
      cuisineType: 'Burger',
      available: true,
      price: '0,00',
      categories: [],
      cuisineLabels: [],
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (dish) {
      setValue('name', dish.name);
      setValue('desc', dish.desc);
      setValue('cuisineType', dish.cuisineType);
      setValue('available', dish.available);
      setValue('price', dish.price);
      setValue('categories', affectedCategories);
      setValue('cuisineLabels', dish.cuisineLabels);
    }
  }, [open, dish, affectedCategories, setValue]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data) => {
    data.categories = data.categories.map((item) => item[0]);
    if (!dish) {
      dispatch(createDish(data));
    } else {
      dispatch(updateDish({ ...dish, ...data }));
    }

    handleClose();
  };

  return (
    <ResponsiveModal
      open={open}
      header={dish ? 'Speise bearbeiten' : 'Speise erstellen'}
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
          <FormSelectField name="cuisineType" label="Typ" items={CUISINE_TYPES} control={control} fullWidth />
        </Grid>
        <Grid item>
          <FormPriceField name="price" label="Preis" control={control} fullWidth />
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
          <FormCheckboxField name="available" label="Verfügbar" control={control} />
        </Grid>
      </Grid>
    </ResponsiveModal>
  );
}

export default DishModal;
