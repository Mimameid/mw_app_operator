import React from 'react';
import { useSelector } from 'react-redux';
import { selectMenuIdsToNames } from 'features/menus/menus/slice';
import { selectCategoryIdsToNames } from 'features/menus/categories/slice';
import { selectDishIdsToNames } from 'features/menus/dishes/slice';
import { discountTypes } from 'common/constants';

import { Box, Checkbox, FormControlLabel, makeStyles, Paper, Tab, Tabs } from '@material-ui/core';
import FormMultiSelectGroup from 'common/components/form/FormMultiSelectGroup';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(3),
  },
  tab: {
    minWidth: '90px',
  },
}));

function FormEffectedItems({ control, type, setValue }) {
  const classes = useStyles();
  const menuIdsToNames = useSelector(selectMenuIdsToNames);
  const categoryIdsToNames = useSelector(selectCategoryIdsToNames);
  const dishIdsToNames = useSelector(selectDishIdsToNames);

  const handleChange = (event, newValue) => {
    setValue('type', newValue);
    setValue('effectedItems', []);
  };

  let items;
  let label;
  switch (type) {
    case discountTypes.menu:
      items = menuIdsToNames;
      label = 'Betroffene Menüs';
      break;

    case discountTypes.category:
      items = categoryIdsToNames;
      label = 'Betroffene Kategorien';
      break;

    case discountTypes.dish:
      items = dishIdsToNames;
      label = 'Betroffene Speisen';

      break;

    default:
  }

  return (
    <Paper className={classes.root} variant="outlined">
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
          className={classes.tab}
          value={discountTypes.menu}
          label={
            <FormControlLabel
              control={<Checkbox color="primary" checked={type === discountTypes.menu} size="small" />}
              label={<Box fontSize="subtitle2.fontSize">Menüs</Box>}
            />
          }
        />
        <Tab
          className={classes.tab}
          value={discountTypes.category}
          label={
            <FormControlLabel
              control={<Checkbox color="primary" checked={type === discountTypes.category} size="small" />}
              label={<Box fontSize="subtitle2.fontSize">Kategorien</Box>}
            />
          }
        />
        <Tab
          className={classes.tab}
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
        <FormMultiSelectGroup
          className={classes.selectField}
          name="effectedItems"
          label={label}
          control={control}
          items={items}
        />
      </Box>
    </Paper>
  );
}

export default FormEffectedItems;
