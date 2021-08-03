import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeChoice } from 'features/menus/dishes/actions';

import { Box, Button, Collapse, Grid, IconButton, Paper } from '@material-ui/core';
import ChoiceSubs from './ChoiceSubs';
import AddSubModal from 'features/menus/choices/components/AddSubModal/AddSubModal';
import EditChoice from './EditChoice';
import TruncatedBox from 'features/menus/common/components/TruncatedBox';
import { Add, Delete, Edit, Remove } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    padding: theme.spacing(2),

    backgroundColor: theme.palette.primary.main,
    borderBottom: '1px solid ' + theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  collapseIconContainer: {
    width: '24px',
    marginLeft: theme.spacing(-1),
    paddingTop: '3px',
    alignSelf: 'flex-start',
  },
  collapseIcon: {
    cursor: 'pointer',
    '&:hover': {
      background: 'none',
    },
  },
  title: {
    cursor: 'pointer',

    userSelect: 'none',
  },
  subtitle: {
    marginTop: '-4px',
    paddingTop: theme.spacing(1),

    lineHeight: '24px',
  },
  buttonsContainer: {
    paddingLeft: theme.spacing(1),
  },
  contentContainer: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));
function Choice({ choiceId, dish }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const choice = useSelector((state) => state.menus.choices.byId[choiceId]);

  const [show, setShow] = useState(true);
  const [editChoiceOpen, setEditChoiceOpen] = useState(false);
  const [addSubOpen, setAddSubOpen] = useState(false);

  function handleEditChoice() {
    setEditChoiceOpen(true);
  }

  const handleRemoveChoice = (event) => {
    dispatch(removeChoice({ choiceId, dishId: dish.id }));
  };

  function handleAddSubs() {
    setAddSubOpen(true);
  }
  function handleClickCollapse() {
    setShow(!show);
  }

  return (
    <Paper elevation={0}>
      <Box className={classes.headerContainer} display="flex">
        <Box className={classes.collapseIconContainer} onClick={handleClickCollapse}>
          <IconButton className={classes.collapseIcon} disableRipple aria-label="edit" color="inherit" size="small">
            {show ? <Remove fontSize="small" /> : <Add fontSize="small" />}
          </IconButton>
        </Box>
        <Box>
          <Grid container alignItems="center">
            <TruncatedBox
              className={classes.title}
              fontSize="subtitle1.fontSize"
              fontWeight="fontWeightBold"
              onClick={handleClickCollapse}
            >
              {choice.name}
            </TruncatedBox>
            <Grid className={classes.buttonsContainer} item>
              <IconButton aria-label="edit" color="inherit" size="small" onClick={handleEditChoice}>
                <Edit fontSize="small" />
              </IconButton>
              {dish ? (
                <IconButton aria-label="edit" color="inherit" size="small" onClick={handleRemoveChoice}>
                  <Delete fontSize="small" />
                </IconButton>
              ) : null}
            </Grid>
            <Grid item className={classes.buttonsContainer}>
              <Button size="small" variant="outlined" color="inherit" endIcon={<Add />} onClick={handleAddSubs}>
                Option
              </Button>
            </Grid>
          </Grid>
          <TruncatedBox className={classes.subtitle} fontSize="subtitle2.fontSize" fontStyle="italic">
            {choice.desc}
          </TruncatedBox>
        </Box>
      </Box>
      <Collapse in={show}>
        <Box className={classes.contentContainer}>
          <ChoiceSubs choice={choice} />
        </Box>
      </Collapse>
      <EditChoice open={editChoiceOpen} setOpen={setEditChoiceOpen} choice={choice} />
      <AddSubModal open={addSubOpen} setOpen={setAddSubOpen} choiceId={choiceId} />
    </Paper>
  );
}

export default Choice;
