import React from 'react';
import { useController } from 'react-hook-form';

import { TextField } from '@mui/material';
import TimeField from 'react-simple-timefield';

function FormTimeField({ control, name, onChange, ...props }) {
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <TimeField
      {...props}
      inputRef={ref}
      {...inputProps}
      onChange={(event) => {
        inputProps.onChange(event);
        if (onChange) {
          onChange(event.target.value);
        }
      }}
      error={!!error}
      helperText={error ? error.message : null}
      inputProps={{ min: 0, style: { textAlign: 'center' } }}
      input={<TextField />}
    />
  );
}

export default FormTimeField;
