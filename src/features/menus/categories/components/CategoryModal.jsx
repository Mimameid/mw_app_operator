import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeSelectAffectedMenus, selectMenuIdsToNames } from 'features/menus/menus/slice';
import { createCategory, updateCategory } from '../actions';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Grid } from '@mui/material';
import FormTextField from 'common/components/form/FormTextField';
import FormMultiSelectGroup from 'common/components/form/FormMultiSelectGroup';
import ResponsiveModal from 'common/components/feedback/ResponsiveModal';

const schema = yup.object({
  name: yup.string('Geben Sie einen Namen ein.').max(48, 'Name zu lang.').required('Name ist erforderlich'),
  desc: yup
    .string('Geben Sie eine Beschreibung ein.')
    .max(128, 'Beschreibung zu lang.')
    .required('Beschreibung ist erforderlich'),
  menus: yup.array(),
});

const defaultValues = { name: '', desc: '', menus: [] };

function CategoryModal({ open, onClose, category }) {
  const dispatch = useDispatch();
  const selectAffectedMenus = useMemo(makeSelectAffectedMenus, []);
  const affectedMenus = useSelector((state) => selectAffectedMenus(state, category ? category.id : null));
  const menuIdsToNames = useSelector(selectMenuIdsToNames);
  const [loading, setLoading] = useState(false);

  const { handleSubmit, control, reset, formState } = useForm({
    mode: 'onChange',
    defaultValues: category ? { name: category.name, desc: category.desc, menus: affectedMenus } : defaultValues,
    delayError: 300,
    resolver: yupResolver(schema),
  });

  const resetValues = useCallback(() => {
    reset(category ? { name: category.name, desc: category.desc, menus: affectedMenus } : defaultValues);
  }, [category, affectedMenus, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    data.menus = data.menus.map((item) => item[0]);

    if (!category) {
      await dispatch(createCategory(data));
    } else {
      await dispatch(updateCategory({ ...category, ...data }));
    }
    onClose();
  };

  useEffect(() => {
    resetValues();
  }, [resetValues, category]);

  const { isValid } = formState;
  return (
    <ResponsiveModal
      open={open}
      header={category ? 'Kategorie bearbeiten' : 'Kategorie erstellen'}
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
          <FormMultiSelectGroup
            name="menus"
            label="Zum Menü hinzufügen"
            group="Menüs"
            items={menuIdsToNames}
            control={control}
          />
        </Grid>
      </Grid>
    </ResponsiveModal>
  );
}

export default CategoryModal;
