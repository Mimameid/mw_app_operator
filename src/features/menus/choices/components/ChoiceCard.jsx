import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeSelectAffectedDishes, removeChoice } from 'features/menus/dishes/dishesSlice';
import { selectChoice } from '../choicesSlice';

import { Box, Card, CardContent, CardHeader, IconButton, makeStyles } from '@material-ui/core';
import Sub from 'features/menus/subs/components/Sub';
import EditChoiceModal from './EditChoiceModal';
import WarningDialog from 'common/components/other/WarningDialog';
import { Add, Delete, Edit } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
    overflow: 'initial',
    marginTop: theme.spacing(4),
  },
  headerContainer: {
    width: '96%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing(-4),

    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,

    borderRadius: theme.spacing(2),
  },
  headerTitle: {
    fontSize: theme.typography.subtitle1.fontSize,
    fontWeight: theme.typography.fontWeightBold,
  },
  headerSubtitle: {
    color: theme.palette.common.white,
    ...theme.typography.body2,
  },
  headerActions: {
    backgroundColor: 'white',
  },
}));

function ChoiceCard({ choiceId, setAddSubOpen }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const choice = useSelector((state) => state.menus.choices.byId[choiceId]);
  const selectAffectedDishes = useMemo(makeSelectAffectedDishes, []);
  const affectedDishes = useSelector((state) => selectAffectedDishes(state, choice.id));

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editDishOpen, setEditDishOpen] = useState(false);

  function handleEditDish() {
    if (affectedDishes.length > 0) {
      setEditDialogOpen(true);
      return;
    }
    setEditDishOpen(true);
  }

  const handleRejectDialog = (event) => {
    setEditDialogOpen(false);
  };

  const handleAcceptDialog = (event) => {
    setEditDialogOpen(false);
    setEditDishOpen(true);
  };

  const handleRemoveDish = (event) => {
    dispatch(removeChoice(choiceId));
  };

  function handleAddSubs() {
    dispatch(selectChoice(choiceId));
    setAddSubOpen(true);
  }

  return (
    <Box display="flex">
      <Card className={classes.card} elevation={3}>
        <CardHeader
          className={classes.headerContainer}
          title={
            <Box className={classes.headerTitle}>
              {choice.name}
              <IconButton aria-label="edit choice" size="small" onClick={handleEditDish}>
                <Edit fontSize="small" />
              </IconButton>
              <IconButton aria-label="delete choice" size="small" onClick={handleRemoveDish}>
                <Delete fontSize="small" />
              </IconButton>
            </Box>
          }
          subheader={<Box className={classes.headerSubtitle}>{choice.desc}</Box>}
          action={
            <IconButton aria-label="settings" size="small" onClick={handleAddSubs}>
              <Add fontSize="small" />
            </IconButton>
          }
        />

        <CardContent>
          {choice.subs.length > 0 ? (
            choice.subs.map((subId) => <Sub key={subId} subId={subId} />)
          ) : (
            <Box color="text.secondary" fontStyle="italic" p={1}>
              Bitte fügen Sie eine Option hinzu...
            </Box>
          )}
        </CardContent>
        <EditChoiceModal open={editDishOpen} setOpen={setEditDishOpen} choice={choice} />
        <WarningDialog
          open={editDialogOpen}
          title="Extra bearbeiten?"
          message={
            'Das Bearbeiten des Extras ändert das Extra in sämtlichen Speisen und sämtlichen Menüs in denen die Speise vorkommt. Betroffene Speisen: ' +
            affectedDishes.toString() +
            '.'
          }
          handleReject={handleRejectDialog}
          handleAccept={handleAcceptDialog}
        />
      </Card>
    </Box>
  );
}

export default ChoiceCard;
