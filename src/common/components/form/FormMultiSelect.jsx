import React from 'react';
import { useController } from 'react-hook-form';

import { MenuItem, Checkbox, ListItemText, makeStyles, TextField } from '@material-ui/core';
import TruncatedChip from 'features/menus/common/components/TruncatedChip';

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: '0 2px',
  },
  menu: {
    maxHeight: theme.spacing(53),
  },
  select: {
    '&:focus': { borderRadius: theme.shape.borderRadius },
  },
}));

function FormMultiSelect({ control, name, items, ...props }) {
  const classes = useStyles();
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
        classes: { select: classes.select },
        multiple: true,
        value: inputProps.value,
        MenuProps: {
          className: classes.menu,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          getContentAnchorEl: null,
        },
        renderValue: (selected) => {
          return selected.map((item, _) => {
            return <TruncatedChip className={classes.chip} key={item} label={item} />;
          });
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

export default FormMultiSelect;
