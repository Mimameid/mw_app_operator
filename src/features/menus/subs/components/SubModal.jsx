import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeSelectAffectedChoices, selectChoiceIdsToNames } from 'features/menus/choices/slice';
import { createSub, updateSub } from '../actions';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Grid } from '@material-ui/core';
import FormTextField from 'common/components/form/FormTextField';
import FormPriceField from 'common/components/form/FormPriceField';
import FormMultiSelectGroup from 'common/components/form/FormMultiSelectGroup';
import ResponsiveModal from 'common/components/other/ResponsiveModal';

const schema = yup.object({
  name: yup.string('Geben Sie einen Namen ein.').max(48, 'Name zu lang.').required('Name ist erforderlich'),
  price: yup.number('Geben Sie einen Preis ein.').required('Preis ist erforderlich.'),
});

function SubModal({ open, onClose, sub }) {
  const dispatch = useDispatch();
  const selectAffectedChoices = useMemo(makeSelectAffectedChoices, []);
  const affectedChoices = useSelector((state) => selectAffectedChoices(state, sub ? sub.id : null));
  const choiceIdsToNames = useSelector(selectChoiceIdsToNames);

  const { handleSubmit, control, reset, setValue } = useForm({
    mode: 'onTouched',
    defaultValues: {
      name: '',
      price: 0,
      choices: [],
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (sub) {
      setValue('name', sub.name);
      setValue('price', sub.price);
      setValue('choices', affectedChoices);
    }
  }, [open, sub, affectedChoices, setValue]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data) => {
    data.choices = data.choices.map((item) => item[0]);
    if (!sub) {
      dispatch(createSub(data));
    } else {
      dispatch(updateSub({ ...sub, ...data }));
    }
    handleClose();
  };

  return (
    <ResponsiveModal
      open={open}
      header={sub ? 'Option bearbeiten' : 'Option erstellen'}
      onCancel={handleClose}
      acceptLabel={'Speichern'}
      onAccept={handleSubmit(onSubmit)}
    >
      <Grid container spacing={2} direction="column">
        <Grid item>
          <FormTextField name="name" label="Name" control={control} fullWidth />
        </Grid>
        <Grid item>
          <FormPriceField name="price" label="Preis" control={control} fullWidth />
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
