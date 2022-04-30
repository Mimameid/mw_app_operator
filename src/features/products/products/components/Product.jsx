import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeProduct } from 'features/products/categories/actions';

import { Box, Button, Chip, Collapse, Grid, IconButton } from '@mui/material';
import ProductChoices from 'features/products/products/components/ProductChoices';
import EditProduct from './EditProduct';
import SetChoicesModal from 'features/products/products/components/SetChoicesModal/SetChoicesModal';
import TruncatedBox from 'features/products/common/components/TruncatedBox';
import { Add, Delete, Edit, Remove } from '@mui/icons-material';

const getFieldName = (label) => {
  switch (label) {
    case 'Vegan':
      return 'vegan';
    case 'Vegetarisch':
      return 'vegetarian';
    case 'Halal':
      return 'halal';
    case 'Glutenfrei':
      return 'gluten';
    default:
      return null;
  }
};

function Product({ productId, category }) {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.menus.products.byId[productId]);

  const [show, setShow] = useState(true);
  const [editProductOpen, setEditProductOpen] = useState(false);
  const [setChoicesOpen, setSetChoicesOpen] = useState(false);

  function handleEditProduct() {
    setEditProductOpen(true);
  }

  const handleRemoveProduct = (event) => {
    dispatch(removeProduct({ productId, categoryId: category.id }));
  };

  function handleSetChoices() {
    setSetChoicesOpen(true);
  }

  function handleClickCollapse() {
    setShow(!show);
  }

  return (
    <div>
      <Box sx={{ height: '104px', p: 2 }} display="flex">
        <Box sx={{ width: '24px', ml: -1, alignSelf: 'flex-start' }} onClick={handleClickCollapse}>
          <IconButton
            sx={{
              cursor: 'pointer',
              '&:hover': {
                background: 'none',
              },
            }}
            disableRipple
            aria-label="edit"
            size="small"
          >
            {show ? <Remove fontSize="small" /> : <Add fontSize="small" />}
          </IconButton>
        </Box>
        <Box>
          <Grid container alignItems="center" wrap="nowrap">
            <TruncatedBox
              sx={{ cursor: 'pointer', userSelect: 'none' }}
              fontSize="subtitle1.fontSize"
              fontWeight="fontWeightBold"
              onClick={handleClickCollapse}
            >
              {product.name}
            </TruncatedBox>
            <Grid sx={{ pl: 1 }} item>
              <Box display="flex" flexWrap="nowrap">
                <IconButton aria-label="edit" size="small" onClick={handleEditProduct}>
                  <Edit fontSize="small" />
                </IconButton>
                {category ? (
                  <IconButton aria-label="edit" size="small" onClick={handleRemoveProduct}>
                    <Delete fontSize="small" />
                  </IconButton>
                ) : null}
              </Box>
            </Grid>
            <Grid item sx={{ pl: 1 }}>
              <Button size="small" variant="outlined" color="primary" endIcon={<Add />} onClick={handleSetChoices}>
                Gruppe
              </Button>
            </Grid>
          </Grid>
          <TruncatedBox
            sx={{
              mt: '-4px',
              pt: 1,

              lineHeight: '24px',
            }}
            color="text.secondary"
            fontSize="subtitle2.fontSize"
            fontStyle="italic"
          >
            {product.desc}
          </TruncatedBox>
        </Box>
        <Box
          sx={{ position: 'relative', ml: 'auto' }}
          display="flex"
          flexDirection="column"
          justifyContent="space-around"
        >
          <Box display="inline" color="primary.main" fontWeight="fontWeightBold" textAlign="right">
            {product.price.toFixed(2)}€
          </Box>
          <Box color="text.secondary" fontSize="subtitle2.fontSize" fontStyle="italic" textAlign="right">
            {product.type}
          </Box>
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              display: 'flex',
              fontSize: 'subtitle2.fontSize',
              fontStyle: 'italic',
              textAlign: 'right',
            }}
            color="text.secondary"
          >
            {product.cuisineLabels.map((label, _) => {
              return (
                <Chip
                  sx={{
                    margin: '2px 2px 0 2px',
                    color: (theme) => theme.palette.food_tags[getFieldName(label)].main,
                    bgcolor: (theme) => theme.palette.food_tags[getFieldName(label)].light,
                  }}
                  key={label}
                  label={label}
                  size="small"
                />
              );
            })}
          </Box>
        </Box>
      </Box>

      <Collapse in={show}>
        <Box
          sx={{
            p: 2,
            borderTop: (theme) => '1px solid' + theme.palette.grey[300],
          }}
        >
          <ProductChoices product={product} />
        </Box>
      </Collapse>

      <EditProduct open={editProductOpen} onClose={() => setEditProductOpen(false)} product={product} />
      <SetChoicesModal open={setChoicesOpen} setOpen={setSetChoicesOpen} product={product} />
    </div>
  );
}

export default Product;
