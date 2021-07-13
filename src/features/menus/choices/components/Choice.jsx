import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeChoice } from 'features/menus/dishes/dishesSlice';

import { Box, Card, CardContent, CardHeader, IconButton, makeStyles } from '@material-ui/core';
import ChoiceSubs from './ChoiceSubs';
import AddSubModal from 'features/menus/choices/components/AddSubModal/AddSubModal';
import EditChoice from './EditChoice';
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

function Choice({ choiceId, dish }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const choice = useSelector((state) => state.menus.choices.byId[choiceId]);

  const [editDishOpen, setEditDishOpen] = useState(false);
  const [addSubOpen, setAddSubOpen] = useState(false);

  function handleEditDish() {
    setEditDishOpen(true);
  }

  const handleRemoveChoice = (event) => {
    dispatch(removeChoice({ choiceId, dishId: dish.id }));
  };

  function handleAddSubs() {
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
              {dish ? (
                <IconButton aria-label="delete choice" size="small" onClick={handleRemoveChoice}>
                  <Delete fontSize="small" />
                </IconButton>
              ) : null}
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
            <ChoiceSubs choice={choice} />
          ) : (
            <Box color="text.secondary" fontStyle="italic" p={1}>
              Bitte fügen Sie eine Option hinzu...
            </Box>
          )}
        </CardContent>
        <EditChoice open={editDishOpen} setOpen={setEditDishOpen} choice={choice} />
        <AddSubModal open={addSubOpen} setOpen={setAddSubOpen} choiceId={choiceId} />
      </Card>
    </Box>
  );
}

export default Choice;
