import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addSub } from 'features/menus/choices/choicesSlice';

import { Box, Button, Divider, Grid, List, Modal, Paper, makeStyles } from '@material-ui/core';
import SubItem from './SubItem';
import CreateSubModal from './CreateSubModal';

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

function AddSubModal({ open, setOpen }) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const subsArray = useSelector((state) => {
    let subsArray = Object.values(state.menus.subs.byId);
    subsArray.sort((a, b) => a.name.localeCompare(b.name));
    return subsArray;
  });

  const [createSubOpen, setCreateSubOpen] = useState(false);
  const [checked, setChecked] = useState([]);

  const handleClose = () => {
    setChecked([]);
    setOpen(false);
  };

  function handleCreateDish(event) {
    setCreateSubOpen(true);
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
    for (let subId of checked) {
      dispatch(addSub(subId));
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
                Optionen
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
              {subsArray.length === 0 ? (
                <Box color="text.secondary" fontStyle="italic" p={1}>
                  Keine Option verfügbar. Bitte erstellen Sie eine neue Option...
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
      <CreateSubModal open={createSubOpen} setOpen={setCreateSubOpen} />
    </React.Fragment>
  );
}

export default AddSubModal;
