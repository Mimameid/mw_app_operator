import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addSubs } from 'features/menus/choices/actions';

import { Box, Button, Divider, Grid, List, Paper } from '@mui/material';
import SubItem from './SubItem';
import CreateSubModal from 'features/menus/subs/components/SubModal';
import ResponsiveModal from 'common/components/feedback/ResponsiveModal';

function AddSubModal({ open, setOpen, choiceId }) {
  const dispatch = useDispatch();
  const subsArray = useSelector((state) => {
    let subsArray = Object.values(state.menus.subs.byId);
    subsArray.sort((a, b) => a.name.localeCompare(b.name));
    return subsArray;
  });

  const [subModalOpen, setSubModalOpen] = useState(false);
  const [checked, setChecked] = useState([]);

  const handleClose = () => {
    setChecked([]);
    setOpen(false);
  };

  function handleCreateSub(event) {
    setSubModalOpen(true);
  }

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  async function handleAddChoices(event) {
    await dispatch(addSubs({ choiceId, subs: checked }));

    handleClose();
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
        acceptLabel={'Hinzufügen'}
        onCancel={handleClose}
        onAccept={handleAddChoices}
      >
        <Paper variant="outlined" square>
          <List
            sx={{ position: 'relative', overflow: 'auto', maxHeight: 320, height: '304px', padding: 0 }}
            subheader={<li />}
          >
            {subsArray.length === 0 ? (
              <Box color="text.secondary" fontStyle="italic" p={1}>
                Keine Optionen verfügbar. Bitte erstellen Sie eine neue Option...
              </Box>
            ) : (
              <React.Fragment>
                {subsArray.map((sub, index) => (
                  <React.Fragment key={sub.id}>
                    <SubItem sub={sub} checked={checked.indexOf(sub.id) !== -1} handleToggle={handleToggle} />
                    {index < subsArray.length - 1 ? <Divider /> : subsArray.length < 5 ? <Divider /> : null}
                  </React.Fragment>
                ))}
              </React.Fragment>
            )}
          </List>
        </Paper>
      </ResponsiveModal>
      <CreateSubModal open={subModalOpen} onClose={() => setSubModalOpen(false)} />
    </React.Fragment>
  );
}

export default AddSubModal;
