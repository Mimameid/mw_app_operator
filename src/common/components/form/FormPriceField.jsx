import React from 'react';
import { useController } from 'react-hook-form';

import { TextField, InputAdornment } from '@material-ui/core';

function getIntAndFractal(value, commaIndex) {
  let intPart = value.substring(0, commaIndex);
  let fractPart = value.substring(commaIndex + 1);

  if (commaIndex < 0) {
    intPart = value.substring(0);
    fractPart = '00';
  }

  if (intPart.length < 1) {
    intPart = '0';
  }

  fractPart = fractPart.padEnd(2, '0');
  // remove leading zeros
  intPart = intPart.replace(/^(?:0+(?=[1-9])|0+(?=0$))/gm, '');
  return [intPart, fractPart];
}

const maskInput = (newValue, previousValue, cursorPosition) => {
  // check if entered char is valid
  let value = newValue.replace(/[^0-9,]+/g, '');
  if (value !== newValue) {
    return [value, --cursorPosition];
  }

  const commaIndex = value.indexOf(',');

  //removed comma
  if (commaIndex < 0 && previousValue.replace(/,/g, '') === value) {
    return [previousValue, cursorPosition];
  }

  if (commaIndex > -1) {
    if (value === ',' && previousValue === '') {
      const temp = '0,00';
      const newCursorPosition = temp.indexOf(',') + 1;
      return [temp, newCursorPosition];
    }

    const commas = value.match(/,/g);
    // entered second comma
    if (commas.length > 1) {
      const newCursorPosition = previousValue.indexOf(',') + 1;
      return [previousValue, newCursorPosition];
    }
  }

  let [intPart, fractPart] = getIntAndFractal(value, commaIndex);
  // int has more than 2 digits
  let carryOver = '';
  if (intPart.length > 2) {
    carryOver = intPart[2];
    intPart = intPart.substring(0, 2);
    fractPart = fractPart.substring(0, 0) + carryOver + fractPart.substring(0, fractPart.length);
    cursorPosition++;
  }

  if (fractPart.length > 2) {
    fractPart = fractPart.substring(0, 2);
  }

  if (intPart === '00') {
    intPart = '0';
  }

  value = intPart;
  if (fractPart.length > 0) {
    value += ',' + fractPart;
  }

  return [value, cursorPosition];
};

function FormPriceField({ control, name, ...props }) {
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const handleOnChange = (event) => {
    const [value, cursorPosition] = maskInput(
      event.target.value,
      event.target.defaultValue,
      event.target.selectionStart,
    );
    event.target.value = value;
    // register rhf
    inputProps.onChange(event);
    event.target.setSelectionRange(cursorPosition, cursorPosition);
    return;
  };

  return (
    <TextField
      inputRef={ref}
      // inputProps={{ inputMode: 'numeric' }}
      InputProps={{
        endAdornment: <InputAdornment position="end">{props.adornment ? props.adornment : '€'}</InputAdornment>,
      }}
      placeholder="00,00"
      error={!!error}
      helperText={error ? error.message : null}
      {...inputProps}
      {...props}
      onChange={handleOnChange}
    />
  );
}

export default FormPriceField;
