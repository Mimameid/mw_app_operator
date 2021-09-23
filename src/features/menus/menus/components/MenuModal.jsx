import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createMenu, updateMenu } from '../actions';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Grid } from '@material-ui/core';
import FormTextField from 'common/components/form/FormTextField';
import ResponsiveModal from 'common/components/other/ResponsiveModal';

const schema = yup.object({
  name: yup.string('Geben Sie einen Namen ein.').max(255, 'Name zu lang.').required('Name ist erforderlich'),
  desc: yup
    .string('Geben Sie eine Beschreibung ein.')
    .max(255, 'Beschreibung zu lang.')
    .required('Beschreibung ist erforderlich'),
});

function MenuModal({ open, onClose, menu }) {
  const dispatch = useDispatch();
  const { handleSubmit, control, reset, setValue } = useForm({
    mode: 'onTouched',
    defaultValues: {
      name: '',
      desc: '',
      active: false,
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (menu) {
      setValue('name', menu.name);
      setValue('desc', menu.desc);
    }
  }, [open, menu, setValue]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data) => {
    if (!menu) {
      dispatch(createMenu(data));
    } else {
      dispatch(updateMenu({ ...menu, ...data }));
    }
    handleClose();
  };

  return (
    <ResponsiveModal
      open={open}
      header={menu ? 'Menü bearbeiten' : 'Menü erstellen'}
      acceptLabel={'Speichern'}
      onCancel={handleClose}
      onAccept={handleSubmit(onSubmit)}
    >
      <Grid container spacing={2} direction="column">
        <Grid item>
          <FormTextField fullWidth name="name" label="Name" control={control} />
        </Grid>
        <Grid item>
          <FormTextField fullWidth name="desc" label="Beschreibung" control={control} />
        </Grid>
      </Grid>
    </ResponsiveModal>
  );
}

export default MenuModal;
