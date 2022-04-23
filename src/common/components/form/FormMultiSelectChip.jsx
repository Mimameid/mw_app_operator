import React from 'react';
import { useController } from 'react-hook-form';

import { MenuItem, Checkbox, ListItemText, TextField } from '@mui/material';
import TruncatedChip from 'features/offers/common/components/TruncatedChip';

function FormMultiSelectChip({ control, name, items, ...props }) {
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
        sx: { '&:focus': { borderRadius: (theme) => theme.shape.borderRadius } },
        multiple: true,
        value: inputProps.value,
        OfferProps: {
          sx: { maxHeight: (theme) => theme.spacing(53) },
        },
        renderValue: (selected) => {
          return selected.map((item, _) => {
            return <TruncatedChip sx={{ margin: '0 2px' }} key={item} label={item} />;
          });
        },
      }}
      inputRef={ref}
      error={!!error}
      helperText={error ? error.message : null}
      {...inputProps}
      {...props}
    >
      {items.length > 0 ? (
        items.map((item, index) => (
          <MenuItem key={index} value={item}>
            <Checkbox color="primary" checked={inputProps.value.indexOf(item) > -1} />
            <ListItemText primary={item} />
          </MenuItem>
        ))
      ) : (
        <MenuItem value="" disabled>
          <em>Keine {props.group} vorhanden.</em>
        </MenuItem>
      )}
    </TextField>
  );
}

export default FormMultiSelectChip;
