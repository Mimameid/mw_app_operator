import React, { useEffect, useMemo } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCategory,
  makeSelectAffectedMenus,
  removeCategory,
  selectMenuIdsToNames,
} from 'features/menus/menus/menusSlice';
import { createCategory, editCategory } from '../categoriesSlice';

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
    width: '300px',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
  },
  header: {
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
  form: {
    padding: '20px',
  },
  buttonLayout: {
    marginTop: '30px',
  },
}));

const schema = yup.object({
  name: yup.string('Geben Sie einen Namen ein.').required('Name ist erforderlich'),
  description: yup.string('Geben Sie eine Beschreibung ein.').required('Beschreibung ist erforderlich'),
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
    defaultValues: { menus: [] },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (category) {
      setValue('name', category.name);
      setValue('description', category.desc);
      setValue('menus', affectedMenus);
    }
  }, [open, category, affectedMenus, setValue]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data) => {
    if (!category) {
      data.id = nanoid(12);
      dispatch(createCategory(data));
    } else {
      data.id = category.id;
      dispatch(editCategory(data));
      // remove category from all menus
      for (let menuIdToName of affectedMenus) {
        dispatch(removeCategory({ categoryId: data.id, menuId: menuIdToName[0] }));
      }
    }

    for (let menuIdtoName of data.menus) {
      dispatch(addCategory({ categoryId: data.id, menuId: menuIdtoName[0] }));
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
          <Grid container className={classes.form} spacing={2} direction="column">
            <Grid item>
              <FormTextField name="name" label="Name" control={control} fullWidth />
            </Grid>
            <Grid item>
              <FormTextField name="description" label="Beschreibung" control={control} fullWidth />
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
            <Grid container item className={classes.buttonLayout}>
              <Grid item xs={6}>
                <Button variant="contained" onClick={handleClose}>
                  Abbrechen
                </Button>
              </Grid>
              <Grid item xs={6}>
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
