import React from 'react';
import { useController } from 'react-hook-form';

import { MenuItem, Checkbox, ListItemText, Chip, makeStyles, TextField } from '@material-ui/core';

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

function FormTagMultiSelect({ control, name, items, ...props }) {
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
    <TextField
      select
      SelectProps={{
        multiple: true,
        value: inputProps.value,
        MenuProps: {
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          getContentAnchorEl: null,
        },
        renderValue: (selected) => {
          return (
            <div className={classes.chips}>
              {selected.map((tag, _) => {
                return <Chip className={getTagClass(tag)} key={tag} label={tag} size="small" />;
              })}
            </div>
          );
        },
      }}
      inputRef={ref}
      error={!!error}
      helperText={error ? error.message : null}
      {...inputProps}
      {...props}
      fullWidth
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
    </TextField>
  );
}

export default FormTagMultiSelect;
