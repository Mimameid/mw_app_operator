import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeSelectAffectedProducts, selectProductIdsToNames } from 'features/products/products/slice';
import { createChoice, updateChoice } from '../actions';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Grid } from '@mui/material';
import FormTextField from 'common/components/form/FormTextField';
import FormSelectField from 'common/components/form/FormSelectField';
import FormMultiSelectGroup from 'common/components/form/FormMultiSelectGroup';
import ResponsiveModal from 'common/components/feedback/ResponsiveModal';

const schema = yup.object({
  name: yup.string('Geben Sie einen Namen ein.').max(48, 'Name zu lang.').required('Name ist erforderlich'),
  desc: yup.string('Geben Sie eine Beschreibung ein.').max(128, 'Beschreibung zu lang.').optional(),
  minRequired: yup.string('Geben Sie an, wieviele Optionen verpflichtend sind.').required('Angabe ist erforderlich.'),
  maxAllowed: yup
    .string('Geben Sie an, wieviele Optionen erlaubt sind.')
    .transform((value) => (isNaN(value) ? '-1' : value))
    .test(
      'maxAllowed',
      'Die maximal erlaubten Optionen muss mindestens so groß sein wie die minimal erlaubten Optionen.',
      function (value) {
        const valid = value > -1 ? value >= this.parent.minRequired : true;
        return valid;
      },
    )
    .required('Angabe ist erforderlich.'),
});

const defaultValues = {
  name: '',
  desc: '',
  minRequired: 0,
  maxAllowed: -1,
  products: [],
};

function ChoiceModal({ open, onClose, choice }) {
  const dispatch = useDispatch();
  const selectAffectedProducts = useMemo(makeSelectAffectedProducts, []);
  const affectedProducts = useSelector((state) => selectAffectedProducts(state, choice ? choice.id : null));
  const productIdsToNames = useSelector(selectProductIdsToNames);
  const [loading, setLoading] = useState(false);

  const { handleSubmit, control, reset, formState } = useForm({
    mode: 'onChange',
    defaultValues: choice ? { ...choice, products: affectedProducts } : defaultValues,
    delayError: 300,
    resolver: yupResolver(schema),
  });

  const resetValues = useCallback(() => {
    reset(choice ? { ...choice, products: affectedProducts } : defaultValues);
  }, [choice, affectedProducts, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    data.products = data.products.map((item) => item[0]);
    if (!choice) {
      await dispatch(createChoice(data));
    } else {
      await dispatch(updateChoice({ ...choice, ...data }));
    }
    onClose();
  };

  useEffect(() => {
    resetValues();
  }, [resetValues, choice]);

  const { isValid } = formState;
  return (
    <ResponsiveModal
      open={open}
      header={choice ? 'Optiongruppe bearbeiten' : 'Optiongruppe erstellen'}
      acceptLabel={'Speichern'}
      onCancel={onClose}
      onAccept={handleSubmit(onSubmit)}
      disabled={!isValid}
      loading={loading}
      TransitionProps={{
        onExited: () => {
          resetValues();
          setLoading(false);
        },
      }}
    >
      <Grid container spacing={2} direction="column">
        <Grid item>
          <FormTextField name="name" label="Name*" control={control} fullWidth />
        </Grid>
        <Grid item>
          <FormTextField name="desc" label="Beschreibung" control={control} fullWidth />
        </Grid>
        <Grid item>
          <FormSelectField
            name="minRequired"
            label="Minimal Erforderlich*"
            items={['0', '1', '2', '3', '4', '5', '6']}
            control={control}
            fullWidth
          />
        </Grid>
        <Grid item>
          <FormSelectField
            name="maxAllowed"
            label="Maximal Erlaubt*"
            items={[-1, 1, 2, 3, 4, 5, 6]}
            control={control}
            fullWidth
          />
        </Grid>
        <Grid item>
          <FormMultiSelectGroup
            name="products"
            group="Angebote"
            label="Zum Angebot hinzufügen"
            items={productIdsToNames}
            control={control}
            fullWidth
          />
        </Grid>
      </Grid>
    </ResponsiveModal>
  );
}

export default ChoiceModal;
