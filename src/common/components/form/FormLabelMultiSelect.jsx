import React from 'react';
import { useController } from 'react-hook-form';

import { MenuItem, Checkbox, ListItemText, Chip, TextField } from '@mui/material';

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

function FormLabelMultiSelect({ control, name, items, ...props }) {
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <TextField
      select
      SelectProps={{
        multiple: true,
        value: inputProps.value,
        renderValue: (selected) => {
          return (
            <div sx={{ display: 'flex', flexWrap: 'wrap' }}>
              {selected.map((label, _) => {
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

export default FormLabelMultiSelect;
