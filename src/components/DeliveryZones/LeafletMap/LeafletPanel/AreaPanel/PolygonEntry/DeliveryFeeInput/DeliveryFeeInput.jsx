import React, { useState } from 'react';

import { makeStyles } from '@material-ui/styles';
import { TextField, InputAdornment } from '@material-ui/core';

import DeliveryIcon from '../../../../../../../assets/delivery_icon.png';

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

function DeliveryFeeInput({ setDeliveryFee, deliveryFee }) {
  const classes = useStyles();
  const [orderValue, setOrderValue] = useState(deliveryFee);

  const onChangeOrderValue = (event) => {
    let value = event.target.value;
    if (!value) {
      setOrderValue(0);
      setDeliveryFee(0);
    }

    value = Number(value);
    if (value > -1 && value < 100) {
      setOrderValue(value);
      setDeliveryFee(value);
    }
  };

  return (
    <React.Fragment>
      <img src={DeliveryIcon} alt="Delivery Icon" width="18" height="18" />
      <TextField
        className={classes.deliveryFeeInput}
        size="small"
        value={orderValue}
        onChange={onChangeOrderValue}
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
