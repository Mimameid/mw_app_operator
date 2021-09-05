import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useController } from 'react-hook-form';
import { queryPredictions } from 'features/shop/location/actions';

import { Box, ClickAwayListener, IconButton, InputAdornment, TextField } from '@material-ui/core';
import AutocompleteDropdown from './AutocompleteDropdown';
import { Close } from '@material-ui/icons';

function Autocomplete({ control, name, onSelect, ...props }) {
  const dispatch = useDispatch();
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const [open, setOpen] = useState(false);
  const onChange = (event) => {
    inputProps.onChange(event);
    dispatch(queryPredictions(event.target.value));
  };

  const onBlur = (event) => {
    inputProps.onBlur(event);
    // setVisibility('none');
    setOpen(false);
  };

  const handleClickAway = (e) => {
    onBlur();
  };

  const selectHandler = () => {
    onSelect();
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway} mouseEvent="onMouseDown">
      <Box style={{ position: 'relative' }} width={'100%'}>
        <TextField
          inputRef={ref}
          inputProps={{ spellCheck: 'false' }}
          autoComplete="new-password"
          {...inputProps}
          onChange={onChange}
          onFocus={() => setOpen(true)}
          error={!!error}
          helperText={error ? error.message : null}
          {...props}
          // InputProps={{
          //   endAdornment: (
          //     <InputAdornment position="end">
          //       <IconButton
          //         aria-label="toggle password visibility"
          //         // onClick={handleClickShowPassword}
          //         // onMouseDown={handleMouseDownPassword}s

          //         edge="end"
          //       >
          //         <Close />
          //       </IconButton>
          //     </InputAdornment>
          //   ),
          // }}
          fullWidth
        />
        <AutocompleteDropdown open={open} onSelect={selectHandler} />
      </Box>
    </ClickAwayListener>
  );
}

export default Autocomplete;
