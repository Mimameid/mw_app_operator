import React from 'react';
import { useController } from 'react-hook-form';
import { nanoid } from 'common/constants';

import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@material-ui/core';

function FormSelectField({ control, name, items, ...props }) {
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <FormControl fullWidth>
      <InputLabel>{props.label}</InputLabel>
      <Select
        inputRef={ref}
        error={!!error}
        {...inputProps}
        {...props}
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          getContentAnchorEl: null,
        }}
      >
        {items.map((item) => (
          <MenuItem key={nanoid()} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error={!!error}>{error ? error.message : null}</FormHelperText>
    </FormControl>
  );
}

export default FormSelectField;
