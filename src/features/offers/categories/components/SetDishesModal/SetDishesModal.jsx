import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDishes } from 'features/offers/categories/actions';
import { selectDishesAsArray } from 'features/offers/dishes/slice';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Box, Button, Grid, Paper } from '@mui/material';
import DishModal from 'features/offers/dishes/components/DishModal';
import ResponsiveModal from 'common/components/feedback/ResponsiveModal';
import FormItemSelect from 'common/components/form/FormItemSelect';
import DishItem from './DishItem';

const schema = yup.object({
  dishes: yup.array().of(yup.string().length(12).required()),
});

function SetDishesModal({ open, setOpen, category }) {
  const dispatch = useDispatch();
  const dishesArray = useSelector(selectDishesAsArray);

  const { handleSubmit, control, reset } = useForm({
    mode: 'onChange',
    defaultValues: { dishes: category.dishes },
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [dishModalOpen, setDishModalOpen] = useState(false);

  useEffect(() => {
    reset({ dishes: category.dishes });
  }, [reset, category]);

  function handleCreateDish(event) {
    setDishModalOpen(true);
  }

  async function onSubmit(data) {
    setLoading(true);
    await dispatch(setDishes({ categoryId: category.id, dishes: data.dishes }));
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
                Speisen
              </Box>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleCreateDish}>
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
        loading={loading}
        TransitionProps={{
          onExited: () => {
            setLoading(false);
          },
        }}
      >
        <Paper variant="outlined" square>
          <FormItemSelect
            name="dishes"
            control={control}
            items={dishesArray}
            placeholder={'Keine Kategorien verfügbar. Bitte erstellen Sie eine neue Kategorie...'}
            RenderComponent={DishItem}
          />
        </Paper>
      </ResponsiveModal>
      <DishModal open={dishModalOpen} onClose={() => setDishModalOpen(false)} />
    </React.Fragment>
  );
}

export default SetDishesModal;
