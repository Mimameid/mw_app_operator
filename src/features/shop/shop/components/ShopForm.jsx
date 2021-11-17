import React from 'react';
import { CUISINE_TYPES, CUISINE_LABELS, SERVICE_TYPES } from 'common/constants';
import useDetectFormChange from 'common/hooks/useDetectFormChange';

import { useFormContext } from 'react-hook-form';

import { Box, Grid } from '@mui/material';
import OpeningHours from 'features/shop/shop/components/OpeningHours';
import FormSwitch from 'common/components/form/FormSwitch';
import FormMultiSelect from 'common/components/form/FormMultiSelectChip';
import FormTextField from 'common/components/form/FormTextField';

function ShopForm() {
  const { control, setValue, formState } = useFormContext();
  const { isDirty } = formState;
  useDetectFormChange({ isDirty });

  return (
    <React.Fragment>
      <Box width="90%" m="auto" pb={8}>
        <Grid container direction="column" spacing={4}>
          <Grid container item spacing={4} justifyContent="space-around">
            <Grid item xs={12} sm={6}>
              <Box>
                <FormTextField name="name" label="Name*" control={control} variant="outlined" fullWidth />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormTextField
                name="desc"
                label="Kurzbeschreibung*"
                placeholder="Beschreiben Sie ihr Shop kurz..."
                control={control}
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container item spacing={4} justifyContent="space-around">
            <Grid item xs={12} sm={6}>
              <FormTextField
                name="location.postCode"
                label="Postleitzahl*"
                control={control}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormTextField name="location.city" label="Ort*" control={control} variant="outlined" fullWidth />
            </Grid>
          </Grid>
          <Grid container item spacing={4} justifyContent="space-around">
            <Grid item xs={12} sm={6}>
              <FormTextField name="location.street" label="Straße*" control={control} variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormTextField
                name="location.streetNumber"
                label="Hausnummer*"
                control={control}
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>

          <Grid container item spacing={4} justifyContent="space-around">
            <Grid item xs={12} sm={6}>
              <FormTextField name="phoneNumber" label="Telefonnummer*" control={control} variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormTextField name="url" label="URL" control={control} variant="outlined" fullWidth />
            </Grid>
          </Grid>

          <Grid container item spacing={4} justifyContent="space-around">
            <Grid item xs={12} sm={6}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <FormMultiSelect
                    name="serviceTypes"
                    label="Servicearten*"
                    items={SERVICE_TYPES}
                    control={control}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormMultiSelect
                    name="cuisineTypes"
                    label="Kategorien*"
                    items={CUISINE_TYPES}
                    control={control}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormTextField
                sx={{ height: '100%' }}
                InputProps={{
                  sx: {
                    height: '100%',
                  },
                }}
                name="descLong"
                label="Beschreibung*"
                placeholder="Beschreiben Sie ihr Shop etwas ausführlicher..."
                control={control}
                variant="outlined"
                multiline
                rows={6}
                fullWidth
              />
            </Grid>
          </Grid>

          <Grid container item spacing={4} justifyContent="space-around">
            <Grid item xs={12} sm={6}>
              <Box>
                <OpeningHours name="openingHours" control={control} setOpeningHours={setValue} />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <FormMultiSelect
                    name="serviceTypes"
                    label="Servicearten*"
                    items={SERVICE_TYPES}
                    control={control}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormMultiSelect
                    name="cuisineLabels"
                    label="Labels"
                    items={CUISINE_LABELS}
                    control={control}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormSwitch
                    name="isKosher"
                    label="Koscher"
                    control={control}
                    desc="Geben Sie an, ob Ihre Gastronomie das Essen Koscher zubereitet."
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}

export default ShopForm;
