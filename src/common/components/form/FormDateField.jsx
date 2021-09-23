import React from 'react';
import { useController } from 'react-hook-form';

import { TextField } from '@material-ui/core';

function FormDateField({ control, name, ...props }) {
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <TextField
      inputRef={ref}
      {...inputProps}
      error={!!error}
      helperText={error ? error.message : null}
      value={new Intl.DateTimeFormat('de-DE').format(inputProps.value)}
      {...props}
    />
  );
}

export default FormDateField;
