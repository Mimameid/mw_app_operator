import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setChoices } from 'features/menus/dishes/actions';
import { selectChoicesAsArray } from 'features/menus/choices/slice';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Box, Button, Grid, Paper } from '@mui/material';
import ChoiceModal from 'features/menus/choices/components/ChoiceModal';
import FormItemSelect from 'common/components/form/FormItemSelect';
import ChoiceItem from './ChoiceItem';
import ResponsiveModal from 'common/components/feedback/ResponsiveModal';

const schema = yup.object({
  choices: yup.array().of(yup.string().length(12).required()),
});

function SetChoicesModal({ open, setOpen, dish }) {
  const dispatch = useDispatch();
  const choicesArray = useSelector(selectChoicesAsArray);

  const { handleSubmit, control, reset } = useForm({
    mode: 'onChange',
    defaultValues: { choices: dish.choices },
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [choiceModalOpen, setChoiceModalOpen] = useState(false);

  useEffect(() => {
    reset({ choices: dish.choices });
  }, [reset, dish]);

  function handleCreateChoice(event) {
    setChoiceModalOpen(true);
  }

  async function onSubmit(data) {
    setLoading(true);
    await dispatch(setChoices({ dishId: dish.id, choices: data.choices }));
    setOpen(false);
  }

  return (
    <React.Fragment>
      <ResponsiveModal
        open={open}
        header={
          <Grid container justifyContent="space-between">
            <Grid item>
              <Box fontSize={'h5.fontSize'} color="primary.main">
                Optiongruppe
              </Box>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleCreateChoice}>
                Erstellen
              </Button>
            </Grid>
          </Grid>
        }
        acceptLabel={'Auswählen'}
        onCancel={() => {
          setOpen(false);
        }}
        onAccept={handleSubmit(onSubmit)}
        loading={loading}
        TransitionProps={{
          onExited: () => {
            setLoading(false);
          },
        }}
      >
        <Paper variant="outlined" square>
          <FormItemSelect
            name="choices"
            control={control}
            items={choicesArray}
            placeholder={'Keine Optiongruppe verfügbar. Bitte erstellen Sie eine neue Optiongruppe...'}
            RenderComponent={ChoiceItem}
          />
        </Paper>
      </ResponsiveModal>
      <ChoiceModal open={choiceModalOpen} onClose={() => setChoiceModalOpen(false)} />
    </React.Fragment>
  );
}

export default SetChoicesModal;
