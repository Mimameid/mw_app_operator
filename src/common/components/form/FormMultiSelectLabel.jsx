import React from 'react';
import { useController } from 'react-hook-form';

import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Checkbox,
  ListItemText,
  makeStyles,
  Chip,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  halal: {
    margin: '2px 2px 0 2px',
    color: theme.palette.food_tags.halal.main,
    backgroundColor: theme.palette.food_tags.halal.light,
  },
  vegan: {
    margin: '2px 2px 0 2px',
    color: theme.palette.food_tags.vegan.main,
    backgroundColor: theme.palette.food_tags.vegan.light,
  },
  vegetarian: {
    margin: '2px 2px 0 2px',
    color: theme.palette.food_tags.vegetarian.main,
    backgroundColor: theme.palette.food_tags.vegetarian.light,
  },
  kosher: {
    margin: '2px 2px 0 2px',
    color: theme.palette.food_tags.kosher.main,
    backgroundColor: theme.palette.food_tags.kosher.light,
  },
  gluten: {
    margin: '2px 2px 0 2px',
    color: theme.palette.food_tags.gluten.main,
    backgroundColor: theme.palette.food_tags.gluten.light,
  },
}));

function FormMultiSelectLabel({ control, name, items, ...props }) {
  const classes = useStyles();
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const getTagClass = (tag) => {
    switch (tag) {
      case 'Vegan':
        return classes.vegan;
      case 'Vegetarisch':
        return classes.vegetarian;
      case 'Halal':
        return classes.halal;
      case 'Koscher':
        return classes.kosher;
      case 'Glutenfrei':
        return classes.gluten;
      default:
        return null;
    }
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{props.label}</InputLabel>
      <Select
        inputRef={ref}
        error={!!error}
        {...inputProps}
        {...props}
        multiple
        multiline
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          getContentAnchorEl: null,
        }}
        renderValue={(selected) => {
          return (
            <div className={classes.chips}>
              {selected.map((tag, _) => {
                return <Chip className={getTagClass(tag)} key={tag} label={tag} size="small" />;
              })}
            </div>
          );
        }}
      >
        {items.length > 0 ? (
          items.map((tag) => (
            <MenuItem key={tag} value={tag}>
              <Checkbox color="primary" checked={inputProps.value.indexOf(tag) > -1} />
              <ListItemText primary={tag} />
            </MenuItem>
          ))
        ) : (
          <MenuItem value="" disabled>
            <em>Keine {props.label} vorhanden.</em>
          </MenuItem>
        )}
      </Select>
      <FormHelperText error={error}>{error ? error.message : null}</FormHelperText>
    </FormControl>
  );
}

export default FormMultiSelectLabel;
