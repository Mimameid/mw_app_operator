import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeSelectAffectedMenus, selectMenuIdsToNames } from 'features/menus/menus/slice';
import { createCategory, updateCategory } from '../actions';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Grid } from '@material-ui/core';
import FormTextField from 'common/components/form/FormTextField';
import FormMultiSelectGroup from 'common/components/form/FormMultiSelectGroup';
import ResponsiveModal from 'common/components/other/ResponsiveModal';

const schema = yup.object({
  name: yup.string('Geben Sie einen Namen ein.').max(255, 'Name zu lang.').required('Name ist erforderlich'),
  desc: yup
    .string('Geben Sie eine Beschreibung ein.')
    .max(255, 'Beschreibung zu lang.')
    .required('Beschreibung ist erforderlich'),
  menus: yup.array(),
});

function CategoryModal({ open, onClose, category }) {
  const dispatch = useDispatch();
  const selectAffectedMenus = useMemo(makeSelectAffectedMenus, []);
  const affectedMenus = useSelector((state) => selectAffectedMenus(state, category ? category.id : null));
  const menuIdsToNames = useSelector(selectMenuIdsToNames);

  const { handleSubmit, control, reset, setValue } = useForm({
    mode: 'onTouched',
    defaultValues: { name: '', desc: '', menus: [] },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (category) {
      setValue('name', category.name);
      setValue('desc', category.desc);
      setValue('menus', affectedMenus);
    }
  }, [open, category, affectedMenus, setValue]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data) => {
    data.menus = data.menus.map((item) => item[0]);
    if (!category) {
      dispatch(createCategory(data));
    } else {
      dispatch(updateCategory({ ...category, ...data }));
    }

    handleClose();
  };

  return (
    <ResponsiveModal
      open={open}
      header={category ? 'Kategorie bearbeiten' : 'Kategorie erstellen'}
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
