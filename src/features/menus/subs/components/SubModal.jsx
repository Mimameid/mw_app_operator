import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeSelectAffectedChoices, selectChoiceIdsToNames } from 'features/menus/choices/slice';
import { createSub, updateSub } from '../actions';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Grid } from '@mui/material';
import FormTextField from 'common/components/form/FormTextField';
import FormPriceField from 'common/components/form/FormPriceField';
import FormMultiSelectGroup from 'common/components/form/FormMultiSelectGroup';
import ResponsiveModal from 'common/components/feedback/ResponsiveModal';

const schema = yup.object({
  name: yup.string('Geben Sie einen Namen ein.').max(48, 'Name zu lang.').required('Name ist erforderlich'),
  price: yup.number('Geben Sie einen Preis ein.').required('Preis ist erforderlich.'),
});

const defaultValues = {
  name: '',
  price: 0,
  choices: [],
};

function SubModal({ open, onClose, sub }) {
  const dispatch = useDispatch();
  const selectAffectedChoices = useMemo(makeSelectAffectedChoices, []);
  const affectedChoices = useSelector((state) => selectAffectedChoices(state, sub ? sub.id : null));
  const choiceIdsToNames = useSelector(selectChoiceIdsToNames);
  const [loading, setLoading] = useState(false);

  const { handleSubmit, control, reset, formState } = useForm({
    mode: 'onChange',
    defaultValues: sub ? { ...sub, choices: affectedChoices } : defaultValues,
    delayError: 300,
    resolver: yupResolver(schema),
  });

  const resetValues = useCallback(() => {
    reset(sub ? { ...sub, choices: affectedChoices } : defaultValues);
  }, [sub, affectedChoices, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    data.choices = data.choices.map((item) => item[0]);
    if (!sub) {
      await dispatch(createSub(data));
    } else {
      await dispatch(updateSub({ ...sub, ...data }));
    }

    onClose();
  };

  useEffect(() => {
    resetValues();
  }, [resetValues, sub]);

  const { isValid } = formState;
  return (
    <ResponsiveModal
      open={open}
      header={sub ? 'Option bearbeiten' : 'Option erstellen'}
      onCancel={onClose}
      acceptLabel={'Speichern'}
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
          <FormPriceField name="price" label="Preis*" control={control} fullWidth />
        </Grid>
        <Grid item>
          <FormMultiSelectGroup
            name="choices"
            group="Optiongruppen"
            label="Zur Optiongruppe hinzufügen"
            items={choiceIdsToNames}
            control={control}
            fullWidth
          />
        </Grid>
      </Grid>
    </ResponsiveModal>
  );
}

export default SubModal;
