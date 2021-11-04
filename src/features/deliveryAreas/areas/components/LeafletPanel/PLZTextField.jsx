import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMap } from 'react-leaflet';
import { deactivateArea, fetchArea } from 'features/deliveryAreas/areas/actions';

import { TextField } from '@mui/material';

function PLZTextField() {
  const dispatch = useDispatch();
  const map = useMap();

  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const dataRef = useRef({});

  const onChangePLZ = (event) => {
    let plz = event.target.value;
    setError(false);
    const plzRegex = /^([0]{1}[1-9]{1}|[1-9]{1}[0-9]{1})[0-9]{3}$/;
    if (plz.match(plzRegex)) {
      dataRef.current.plz = plz;
      dataRef.current.event = event;

      submit();
    }
  };

  const submit = () => {
    dispatch(deactivateArea());

    setDisabled(true);
    const promise = dispatch(fetchArea(dataRef.current.plz));
    promise
      .then((data) => {
        if (data.payload) {
          map.flyTo(data.payload.data.area[0][0], 11, {
            animatre: true,
            duration: 0.75,
          });
        }
      })
      .finally(() => {
        setDisabled(false);
        dataRef.current.event.target.value = '';
      });
  };

  return (
    <React.Fragment>
      <TextField
        sx={{ maxWidth: '72px', padding: '6px 6px 5px 12px', direction: 'ltr' }}
        placeholder="PLZ"
        size="small"
        disabled={disabled}
        error={error}
        onChange={onChangePLZ}
        inputProps={{
          maxLength: 5,
          style: { textAlign: 'center' },
        }}
        fullWidth
      />
    </React.Fragment>
  );
}

export default PLZTextField;
