import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSubs } from 'features/menus/choices/actions';
import { selectSubsAsArray } from 'features/menus/subs/slice';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Box, Button, Grid, Paper } from '@mui/material';

import SubModal from 'features/menus/subs/components/SubModal';
import FormItemSelect from 'common/components/form/FormItemSelect';
import SubItem from './SubItem';
import ResponsiveModal from 'common/components/feedback/ResponsiveModal';

const schema = yup.object({
  subs: yup.array().of(yup.string().length(12).required()),
});

function SetSubsModal({ open, setOpen, choice }) {
  const dispatch = useDispatch();
  const subsArray = useSelector(selectSubsAsArray);

  const { handleSubmit, control, reset } = useForm({
    mode: 'onChange',
    defaultValues: { subs: choice.subs },
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [subModalOpen, setSubModalOpen] = useState(false);

  useEffect(() => {
    reset({ subs: choice.subs });
  }, [reset, choice]);

  function handleCreateSub(event) {
    setSubModalOpen(true);
  }

  async function onSubmit(data) {
    setLoading(true);
    await dispatch(setSubs({ choiceId: choice.id, subs: data.subs }));
    setOpen(false);
  }

  return (
    <React.Fragment>
      <ResponsiveModal
        open={open}
        header={
          <Grid container justifyContent="space-between">
            <Grid item>
              <Box sx={{ mb: 3 }} fontSize={'h5.fontSize'} color="primary.main">
                Optionen
              </Box>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleCreateSub}>
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
            name="subs"
            control={control}
            items={subsArray}
            placeholder={'Keine Optionen verfügbar. Bitte erstellen Sie eine neue Option...'}
            RenderComponent={SubItem}
          />
        </Paper>
      </ResponsiveModal>
      <SubModal open={subModalOpen} onClose={() => setSubModalOpen(false)} />
    </React.Fragment>
  );
}

export default SetSubsModal;
