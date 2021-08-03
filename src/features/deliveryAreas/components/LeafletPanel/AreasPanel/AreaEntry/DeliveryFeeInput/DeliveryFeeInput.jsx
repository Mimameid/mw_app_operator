import React from 'react';

import { TextField, InputAdornment } from '@material-ui/core';
import DeliveryIcon from 'assets/delivery_icon.png';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  deliveryFeeInput: {
    maxWidth: '36px',
    padding: '2px',
    marginLeft: 'auto',
    fontSize: '0.8rem',
    '& .MuiInputBase-input': {
      padding: '1px 2px',
    },
    '& .MuiOutlinedInput-root': {
      fontSize: '0.8rem',
      padding: '2px',

      '& fieldset': {},
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,

        border: '1px solid',
        borderRadius: '2px',
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
        border: '1px solid',
        borderRadius: '2px',
      },
    },
  },
}));

function DeliveryFeeInput({ onChangeDeliveryFee, deliveryFee }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <img src={DeliveryIcon} alt="Delivery Icon" width="18" height="18" />
      <TextField
        className={classes.deliveryFeeInput}
        size="small"
        value={deliveryFee}
        onChange={onChangeDeliveryFee}
        InputProps={{
          startAdornment: (
            <InputAdornment position="end" style={{ marginLeft: 0 }}>
              €
            </InputAdornment>
          ),
        }}
        inputProps={{
          maxLength: 2,
          style: { textAlign: 'right' },
        }}
      />
    </React.Fragment>
  );
}

export default DeliveryFeeInput;
