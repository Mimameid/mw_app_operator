import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Box, Button, Grid, Paper } from '@mui/material';
import ChoiceModal from 'features/products/choices/components/ChoiceModal';
import FormItemSelect from 'common/components/form/FormItemSelect';
import ChoiceItem from './ChoiceItem';
import ResponsiveModal from 'common/components/feedback/ResponsiveModal';

const schema = yup.object({
  items: yup.array().of(yup.string().length(12).required()),
});

function SetChoicesModal({ open, placeholder, selectedItems, items, setOpen, onSubmit }) {
  const { handleSubmit, control, reset } = useForm({
    mode: 'onChange',
    defaultValues: { items: selectedItems },
    resolver: yupResolver(schema),
  });

  const [choiceModalOpen, setChoiceModalOpen] = useState(false);

  useEffect(() => {
    reset({ items: selectedItems });
  }, [reset, selectedItems]);

  function handleCreateChoice(event) {
    setChoiceModalOpen(true);
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
      >
        <Paper variant="outlined" square>
          <FormItemSelect
            name="choices"
            control={control}
            items={items}
            placeholder={placeholder}
            RenderComponent={ChoiceItem}
          />
        </Paper>
      </ResponsiveModal>
      <ChoiceModal open={choiceModalOpen} onClose={() => setChoiceModalOpen(false)} />
    </React.Fragment>
  );
}

export default SetChoicesModal;
