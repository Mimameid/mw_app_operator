import React from 'react';
import { useSelector } from 'react-redux';

import { selectMenuIdsToNames } from 'features/menus/menus/slice';
import { selectCategoryIdsToNames } from 'features/menus/categories/slice';
import { selectDishIdsToNames } from 'features/menus/dishes/slice';
import { discountTypes } from 'common/constants';

import { Box, Checkbox, FormControlLabel, Paper, Tab, Tabs } from '@mui/material';
import FormMultiSelectGroup from 'common/components/form/menu/FormMultiSelectGroup';

function FormDiscountScope({ type, control, setValue }) {
  const menuIdsToNames = useSelector(selectMenuIdsToNames);
  const categoryIdsToNames = useSelector(selectCategoryIdsToNames);
  const dishIdsToNames = useSelector(selectDishIdsToNames);

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

    case discountTypes.dish:
      items = dishIdsToNames;
      label = 'Betroffene Speisen*';

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
              label={<Box fontSize="subtitle2.fontSize">Menüs</Box>}
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
          value={discountTypes.dish}
          label={
            <FormControlLabel
              control={<Checkbox color="primary" checked={type === discountTypes.dish} size="small" />}
              label={<Box fontSize="subtitle2.fontSize">Speisen</Box>}
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
