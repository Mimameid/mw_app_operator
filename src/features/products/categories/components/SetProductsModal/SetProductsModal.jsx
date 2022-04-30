import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts } from 'features/products/categories/actions';
import { selectProductsAsArray } from 'features/products/products/slice';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Box, Button, Grid, Paper } from '@mui/material';
import ProductModal from 'features/products/products/components/ProductModal';
import ResponsiveModal from 'common/components/feedback/ResponsiveModal';
import FormItemSelect from 'common/components/form/FormItemSelect';
import ProductItem from './ProductItem';

const schema = yup.object({
  products: yup.array().of(yup.string().length(12).required()),
});

function SetProductsModal({ open, setOpen, category }) {
  const dispatch = useDispatch();
  const productsArray = useSelector(selectProductsAsArray);

  const { handleSubmit, control, reset } = useForm({
    mode: 'onChange',
    defaultValues: { products: category.products },
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [productModalOpen, setProductModalOpen] = useState(false);

  useEffect(() => {
    reset({ products: category.products });
  }, [reset, category]);

  function handleCreateProduct(event) {
    setProductModalOpen(true);
  }

  async function onSubmit(data) {
    setLoading(true);
    await dispatch(setProducts({ categoryId: category.id, products: data.products }));
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
                Angebote
              </Box>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleCreateProduct}>
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
            name="products"
            control={control}
            items={productsArray}
            placeholder={'Keine Kategorien verfügbar. Bitte erstellen Sie eine neue Kategorie...'}
            RenderComponent={ProductItem}
          />
        </Paper>
      </ResponsiveModal>
      <ProductModal open={productModalOpen} onClose={() => setProductModalOpen(false)} />
    </React.Fragment>
  );
}

export default SetProductsModal;
