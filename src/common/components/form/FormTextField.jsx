import React from 'react';
import { useController } from 'react-hook-form';

import { TextField } from '@material-ui/core';

function FormTextField({ control, name, ...props }) {
  const {
    field: { ref, value, ...inputProps },
    fieldState: { invalid, isTouched, isDirty, error },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name,
    control,
    defaultValue: '',
  });

  return (
    <TextField inputRef={ref} {...inputProps} error={!!error} helperText={error ? error.message : null} {...props} />
  );
}

export default FormTextField;
