import React from 'react';

import { Box, Checkbox, FormControlLabel, Paper, Tab, Tabs } from '@material-ui/core';
import FormCheckboxField from 'common/components/form/FormCheckboxField';
import FormPriceField from 'common/components/form/FormPriceField';

function FormDiscountType({ control, isFixedPrice, percental, setValue }) {
  const handleChange = (event, newValue) => {
    setValue('isFixedPrice', newValue);
    setValue('reduction', '00,00');
    setValue('fixedPrice', '00,00');
  };

  return (
    <Paper variant="outlined">
      <Tabs
        value={isFixedPrice}
        onChange={handleChange}
        variant="fullWidth"
        TabIndicatorProps={{
          style: {
            display: 'none',
          },
        }}
      >
        <Tab
          value={false}
          label={
            <FormControlLabel
              control={<Checkbox color="primary" checked={!isFixedPrice} size="small" />}
              label={<Box fontSize="subtitle2.fontSize">Nachlass</Box>}
            />
          }
        />
        <Tab
          value={true}
          label={
            <FormControlLabel
              control={<Checkbox color="primary" checked={isFixedPrice} size="small" />}
              label={<Box fontSize="subtitle2.fontSize">Festpreis</Box>}
            />
          }
        />
      </Tabs>

      {isFixedPrice ? (
        <Box display="flex" flexDirection="column" p={2} pt={2} justifyContent="space-between">
          <Box display="flex" justifyContent="space-between">
            <Box display="flex" alignItems="center" pr={2} fontWeight={600}>
              Festpreis
            </Box>
          </Box>
          <Box width={62} alignSelf="flex-end">
            <FormPriceField name="fixedPrice" control={control} size="small" />
          </Box>
        </Box>
      ) : (
        <React.Fragment>
          <Box display="flex" flexDirection="column" p={2} justifyContent="space-between">
            <Box display="flex" justifyContent="space-between">
              <Box display="flex" alignItems="center" pr={2} fontWeight={600}>
                Nachlass
              </Box>
              <Box display="flex" mr={-2}>
                <FormCheckboxField name="percental" label="Prozentual" control={control} size="small" />
              </Box>
            </Box>
            <Box width={62} alignSelf="flex-end">
              <FormPriceField name="reduction" control={control} adornment={percental ? '%' : '€'} size="small" />
            </Box>
          </Box>

          <Box display="flex" flexDirection="column" p={2} justifyContent="space-between">
            <Box display="flex" justifyContent="space-between">
              <Box display="flex" alignItems="center" pr={2} fontWeight={600}>
                Mindestbestellwert
              </Box>
            </Box>
            <Box width={62} alignSelf="flex-end">
              <FormPriceField name="minOrderValue" control={control} size="small" />
            </Box>
          </Box>
        </React.Fragment>
      )}
    </Paper>
  );
}

export default FormDiscountType;
