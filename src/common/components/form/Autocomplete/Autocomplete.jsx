import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useController } from 'react-hook-form';
import { queryPredictions } from 'features/restaurant/slices/location/actions';

import { Box, ClickAwayListener, IconButton, InputAdornment, TextField } from '@material-ui/core';
import AutocompleteDropDown from './AutocompleteDropDown';
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

  const [dropDown, setDropDown] = useState(false);

  // Clear Icon Visibility
  const [visibility, setVisibility] = useState('none');
  // const inputContainerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current === document.activeElement) {
      setVisibility('inline-flex');
    } else {
      setVisibility('none');
    }
  }, [setVisibility]);

  const onChange = (event) => {
    inputProps.onChange(event);
    dispatch(queryPredictions(event.target.value));
  };

  const onBlur = (event) => {
    inputProps.onBlur(event);
    // setVisibility('none');
    setDropDown(false);
  };

  const onFocus = () => {
    setDropDown(true);
  };

  const handleClickAway = (e) => {
    onBlur();
  };

  const selectHandler = () => {
    onSelect();
    setDropDown(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway} mouseEvent="onMouseDown">
      <Box style={{ position: 'relative' }}>
        <TextField
          inputRef={ref}
          inputProps={{ spellCheck: 'false' }}
          autoComplete="new-password"
          {...inputProps}
          onChange={onChange}
          onFocus={onFocus}
          error={!!error}
          helperText={error ? error.message : null}
          {...props}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  // onClick={handleClickShowPassword}
                  // onMouseDown={handleMouseDownPassword}s
                  style={{ marginBottom: '4px' }}
                  edge="end"
                >
                  <Close />
                </IconButton>
              </InputAdornment>
            ),
          }}
          fullWidth
        />
        <AutocompleteDropDown open={dropDown} onSelect={selectHandler} />
      </Box>
    </ClickAwayListener>
  );
}

export default Autocomplete;
