import React, { useEffect, useMemo } from 'react';
import { nanoid } from 'common/constants';
import { useDispatch, useSelector } from 'react-redux';
import { makeSelectAffectedMenus, selectMenuIdsToNames } from 'features/menus/menus/slice';
import { createCategory, updateCategory } from '../actions';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Modal, Button, Grid, Paper, Box, makeStyles } from '@material-ui/core';
import FormTextField from 'common/components/form/FormTextField';
import FormMultiSelectGroup from 'common/components/form/FormMultiSelectGroup';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
  formContainer: {
    position: 'absolute',
    width: '432px',
    left: '50%',
    top: '50%',
    padding: theme.spacing(4),

    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
  },
  header: {
    paddingBottom: theme.spacing(2),
  },

  buttonLayout: {
    marginTop: theme.spacing(3),
  },
}));

const schema = yup.object({
  name: yup.string('Geben Sie einen Namen ein.').max(255, 'Name zu lang.').required('Name ist erforderlich'),
  desc: yup
    .string('Geben Sie eine Beschreibung ein.')
    .max(255, 'Beschreibung zu lang.')
    .required('Beschreibung ist erforderlich'),
  menus: yup.array(),
});

function CategoryModal({ open, onClose, category }) {
  const classes = useStyles();
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
    <Modal className={classes.backdrop} open={open}>
      <Paper className={classes.formContainer}>
        <Box className={classes.header} fontSize={'h5.fontSize'} color="primary.main">
          {category ? 'Kategorie bearbeiten' : 'Kategorie erstellen'}
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                fullWidth
              />
            </Grid>
            <Grid className={classes.buttonLayout} container item justifyContent="flex-end" spacing={2}>
              <Grid item>
                <Button variant="contained" onClick={handleClose}>
                  Abbrechen
                </Button>
              </Grid>
              <Grid item>
                <Button color="primary" variant="contained" type="submit">
                  Speichern
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Modal>
  );
}

export default CategoryModal;
