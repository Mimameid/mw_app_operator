import React from 'react';

import { Box, Checkbox, FormControlLabel, makeStyles, Paper, Tab, Tabs } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectMenuIdsToNames } from 'features/menus/menus/slice';
import { selectCategoryIdsToNames } from 'features/menus/categories/slice';
import { selectDishIdsToNames } from 'features/menus/dishes/slice';
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
    case 0:
      items = menuIdsToNames;
      label = 'Betroffene Menüs';
      break;

    case 1:
      items = categoryIdsToNames;
      label = 'Betroffene Kategorien';
      break;

    case 2:
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
          value={0}
          label={
            <FormControlLabel
              control={<Checkbox color="primary" checked={type === 0} size="small" />}
              label={<Box fontSize="subtitle2.fontSize">Menüs</Box>}
            />
          }
        />
        <Tab
          className={classes.tab}
          value={1}
          label={
            <FormControlLabel
              control={<Checkbox color="primary" checked={type === 1} size="small" />}
              label={<Box fontSize="subtitle2.fontSize">Kategorien</Box>}
            />
          }
        />
        <Tab
          className={classes.tab}
          value={2}
          label={
            <FormControlLabel
              control={<Checkbox color="primary" checked={type === 2} size="small" />}
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
