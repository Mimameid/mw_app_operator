import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addChoices } from 'features/menus/dishes/actions';

import { Box, Button, Divider, Grid, List, Paper, makeStyles } from '@material-ui/core';
import ChoiceModal from 'features/menus/choices/components/ChoiceModal';
import ChoiceItem from './ChoiceItem';
import ResponsiveModal from 'common/components/other/ResponsiveModal';

const useStyles = makeStyles((theme) => ({
  list: {
    position: 'relative',
    overflow: 'auto',
    maxHeight: 320,
    height: '304px',
    padding: 0,
  },
}));

function AddChoiceModal({ open, setOpen, dishId }) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const choicesArray = useSelector((state) => {
    const choicesArray = Object.values(state.menus.choices.byId);
    choicesArray.sort((a, b) => a.name.localeCompare(b.name));
    return choicesArray;
  });

  const [choiceModalOpen, setChoiceModalOpen] = useState(false);
  const [checked, setChecked] = useState([]);

  const handleClose = () => {
    setChecked([]);
    setOpen(false);
  };

  function handleCreateChoice(event) {
    setChoiceModalOpen(true);
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
    await dispatch(addChoices({ dishId, choices: checked }));
    handleClose();
  }

  return (
    <React.Fragment>
      <ResponsiveModal
        open={open}
        header={
          <Grid container justifyContent="space-between">
            <Grid item>
              <Box className={classes.header} fontSize={'h5.fontSize'} color="primary.main">
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
        acceptLabel={'Hinzufügen'}
        onCancel={handleClose}
        onAccept={handleAddChoices}
      >
        <Paper variant="outlined" square>
          <List className={classes.list} subheader={<li />}>
            {choicesArray.length === 0 ? (
              <Box color="text.secondary" fontStyle="italic" p={1}>
                Keine Optiongruppe verfügbar. Bitte erstellen Sie eine neue Optiongruppe...
              </Box>
            ) : (
              <React.Fragment>
                {choicesArray.map((choice, index) => (
                  <React.Fragment key={choice.id}>
                    <ChoiceItem
                      choice={choice}
                      checked={checked.indexOf(choice.id) !== -1}
                      handleToggle={handleToggle}
                    />
                    <Divider />
                  </React.Fragment>
                ))}
              </React.Fragment>
            )}
          </List>
        </Paper>
      </ResponsiveModal>
      <ChoiceModal open={choiceModalOpen} onClose={() => setChoiceModalOpen(false)} />
    </React.Fragment>
  );
}

export default AddChoiceModal;
