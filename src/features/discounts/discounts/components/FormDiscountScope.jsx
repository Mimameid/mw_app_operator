import React from 'react';
import { useSelector } from 'react-redux';

import { selectMenuIdsToNames } from 'features/products/menus/slice';
import { selectCategoryIdsToNames } from 'features/products/categories/slice';
import { selectProductIdsToNames } from 'features/products/products/slice';
import { discountTypes } from 'common/constants';

import { Box, Checkbox, FormControlLabel, Paper, Tab, Tabs } from '@mui/material';
import FormMultiSelectGroup from 'common/components/form/FormMultiSelectGroup';

function FormDiscountScope({ type, control, setValue }) {
  const menuIdsToNames = useSelector(selectMenuIdsToNames);
  const categoryIdsToNames = useSelector(selectCategoryIdsToNames);
  const productIdsToNames = useSelector(selectProductIdsToNames);

  const handleChange = (event, newValue) => {
    setValue('scope.itemType', newValue);
    setValue('scope.items', []);
  };

  let items;
  let label;
  switch (type) {
    case discountTypes.menu:
      items = menuIdsToNames;
      label = 'Betroffene Menüs*';
      break;

    case discountTypes.category:
      items = categoryIdsToNames;
      label = 'Betroffene Kategorien*';
      break;

    case discountTypes.product:
      items = productIdsToNames;
      label = 'Betroffene Angebote*';

      break;
    default:
  }

  return (
    <Paper sx={{ pb: 3 }} variant="outlined">
      <Tabs
        value={type}
        onChange={handleChange}
        variant="fullWidth"
        TabIndicatorProps={{
          style: {
            display: 'none',
          },
        }}
      >
        <Tab
          sx={{ minWidth: '90px' }}
          value={discountTypes.menu}
          label={
            <FormControlLabel
              control={<Checkbox color="primary" checked={type === discountTypes.menu} size="small" />}
              label={<Box fontSize="subtitle2.fontSize">Angebote</Box>}
            />
          }
        />
        <Tab
          sx={{ minWidth: '90px' }}
          value={discountTypes.category}
          label={
            <FormControlLabel
              control={<Checkbox color="primary" checked={type === discountTypes.category} size="small" />}
              label={<Box fontSize="subtitle2.fontSize">Kategorien</Box>}
            />
          }
        />
        <Tab
          sx={{ minWidth: '90px' }}
          value={discountTypes.product}
          label={
            <FormControlLabel
              control={<Checkbox color="primary" checked={type === discountTypes.product} size="small" />}
              label={<Box fontSize="subtitle2.fontSize">Angebote</Box>}
            />
          }
        />
      </Tabs>
      <Box px={2}>
        <FormMultiSelectGroup name="scope.items" label={label} control={control} items={items} />
      </Box>
    </Paper>
  );
}

export default FormDiscountScope;
