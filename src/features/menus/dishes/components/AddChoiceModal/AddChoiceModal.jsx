import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addChoice } from 'features/menus/dishes/dishesSlice';

import { Box, Button, Divider, Grid, List, Modal, Paper, makeStyles } from '@material-ui/core';
import ChoiceModal from '../../../choices/components/ChoiceModal';
import ChoiceItem from './ChoiceItem';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
  formContainer: {
    position: 'absolute',
    width: '40%',
    left: '50%',
    top: '50%',
    padding: theme.spacing(2),

    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
  },
  header: {
    marginBottom: theme.spacing(1),
  },
  list: {
    position: 'relative',
    overflow: 'auto',
    maxHeight: 320,
    height: 304,
    padding: 0,

    backgroundColor: theme.palette.background.paper,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
  listHeader: {
    backgroundColor: theme.palette.primary.main,
    borderBottom: '1px solid ' + theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  buttonsContainer: { paddingTop: theme.spacing(1) },
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

  function handleCreateDish(event) {
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

  function handleAddChoices(event) {
    for (let choiceId of checked) {
      dispatch(addChoice({ choiceId, dishId }));
    }

    handleClose();
  }

  return (
    <React.Fragment>
      <Modal className={classes.backdrop} open={open} onClose={handleClose}>
        <Paper className={classes.formContainer}>
          <Grid className={classes.buttonsContainer} container justify="space-between">
            <Grid item>
              <Box className={classes.header} fontSize={'h5.fontSize'} color="primary.main">
                Optiongruppe
              </Box>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleCreateDish}>
                Erstellen
              </Button>
            </Grid>
          </Grid>

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
          <Grid className={classes.buttonsContainer} container justify="flex-end" spacing={1}>
            <Grid item>
              <Button variant="contained" onClick={handleClose}>
                Abbrechen
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleAddChoices}>
                Hinzufügen
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
      <ChoiceModal open={choiceModalOpen} onClose={() => setChoiceModalOpen(false)} />
    </React.Fragment>
  );
}

export default AddChoiceModal;
