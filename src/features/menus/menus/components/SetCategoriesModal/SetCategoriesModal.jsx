import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategories } from 'features/menus/menus/actions';
import { selectCategoriesAsArray } from 'features/menus/categories/slice';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Box, Button, Grid, Paper } from '@mui/material';
import CategoryModal from 'features/menus/categories/components/CategoryModal';
import ResponsiveModal from 'common/components/feedback/ResponsiveModal';
import FormItemSelect from '../../../../../common/components/form/menu/FormItemSelect';
import CategoryItem from './CategoryItem';

const schema = yup.object({
  categories: yup.array().of(yup.string().length(12).required()),
});

function SetCategoriesModal({ open, setOpen, menu }) {
  const dispatch = useDispatch();
  const categoriesArray = useSelector(selectCategoriesAsArray);

  const { handleSubmit, control, reset } = useForm({
    mode: 'onChange',
    defaultValues: { categories: menu.categories },
    resolver: yupResolver(schema),
  });

  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  useEffect(() => {
    reset({ categories: menu.categories });
  }, [reset, menu]);

  function handleCreateCategory(event) {
    setCategoryModalOpen(true);
  }

  async function onSubmit(data) {
    await dispatch(setCategories({ menuId: menu.id, categories: data.categories }));
    setOpen(false);
  }

  return (
    <React.Fragment>
      <ResponsiveModal
        open={open}
        header={
          <Grid container justifyContent="space-between">
            <Grid item>
              <Box fontSize={'h5.fontSize'} color="primary.main">
                Kategorien
              </Box>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleCreateCategory}>
                Erstellen
              </Button>
            </Grid>
          </Grid>
        }
        acceptLabel={'Auswählen'}
        onCancel={() => {
          setOpen(false);
        }}
        onAccept={handleSubmit(onSubmit)}
      >
        <Paper variant="outlined" square>
          <FormItemSelect
            name="categories"
            control={control}
            items={categoriesArray}
            placeholder={'Keine Kategorien verfügbar. Bitte erstellen Sie eine neue Kategorie...'}
            RenderComponent={CategoryItem}
          />
        </Paper>
      </ResponsiveModal>
      <CategoryModal open={categoryModalOpen} onClose={() => setCategoryModalOpen(false)} />
    </React.Fragment>
  );
}

export default SetCategoriesModal;
