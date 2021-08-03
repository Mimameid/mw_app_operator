import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addSubs } from 'features/menus/choices/actions';

import { Box, Button, Divider, Grid, List, Modal, Paper, makeStyles } from '@material-ui/core';
import SubItem from './SubItem';
import CreateSubModal from 'features/menus/subs/components/SubModal';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
  formContainer: {
    position: 'absolute',
    width: '432px',
    left: '50%',
    top: '50%',
    padding: theme.spacing(4),

    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
  },
  header: {
    marginBottom: theme.spacing(3),
  },
  list: {
    position: 'relative',
    overflow: 'auto',
    maxHeight: 320,
    height: '304px',
    padding: 0,
  },
  buttonLayout: {
    marginTop: theme.spacing(3),
  },
}));

function AddSubModal({ open, setOpen, choiceId }) {
  const classes = useStyles();

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

  function handleCreateDish(event) {
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
      <Modal className={classes.backdrop} open={open} onClose={handleClose}>
        <Paper className={classes.formContainer}>
          <Grid container justifyContent="space-between">
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
          <Grid className={classes.buttonLayout} container justifyContent="flex-end" spacing={2}>
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
      <CreateSubModal open={subModalOpen} onClose={() => setSubModalOpen(false)} />
    </React.Fragment>
  );
}

export default AddSubModal;
