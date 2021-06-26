import React from 'react';
import { useController } from 'react-hook-form';
import { nanoid } from '@reduxjs/toolkit';

import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';

function FormSelectField({ control, name, items, ...props }) {
  const {
    field: { ref, ...inputProps },
    fieldState: { invalid, isTouched, isDirty, error },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name,
    control,
  });

  return (
    <FormControl fullWidth>
      <InputLabel>Typ</InputLabel>
      <Select inputRef={ref} error={!!error} {...inputProps} {...props}>
        {items.map((item) => (
          <MenuItem key={nanoid()} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default FormSelectField;
