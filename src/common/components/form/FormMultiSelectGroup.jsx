import React from 'react';
import { useController } from 'react-hook-form';

import { MenuItem, Checkbox, ListItemText, TextField } from '@mui/material';
import TruncatedChip from 'features/products/common/components/TruncatedChip';

function FormMultiSelectGroup({ control, name, items, ...props }) {
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  // all values and current values have to be identical otherwise it will be shown as distinugish values, even though they have the same value
  inputProps.value = items.filter((itemIdToName) => {
    for (let item of inputProps.value) {
      if (item[0] === itemIdToName[0]) {
        return true;
      }
    }
    return false;
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
              {selected.map((item, _) => {
                return <TruncatedChip sx={{ margin: '2px 2px 0 2px' }} key={item[0]} label={item[1]} size="small" />;
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
        items.map((item) => (
          <MenuItem key={item} value={item}>
            <Checkbox color="primary" checked={inputProps.value.indexOf(item) > -1} />
            <ListItemText primary={item[1]} />
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

export default FormMultiSelectGroup;
