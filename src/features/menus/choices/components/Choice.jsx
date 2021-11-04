import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeChoice } from 'features/menus/dishes/actions';

import { Box, Button, Collapse, Grid, IconButton, Paper, Stack } from '@mui/material';
import ChoiceSubs from './ChoiceSubs';
import AddSubModal from 'features/menus/choices/components/AddSubModal/AddSubModal';
import EditChoice from './EditChoice';
import TruncatedBox from 'features/menus/common/components/TruncatedBox';
import { Add, Delete, Edit, Remove } from '@mui/icons-material';

function Choice({ choiceId, dish }) {
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
      <Box
        sx={{
          p: 2,

          bgcolor: 'primary.main',
          color: 'common.white',
          borderBottom: (theme) => '1px solid ' + theme.palette.primary.main,
        }}
        display="flex"
      >
        <Box sx={{ width: '24px', ml: -1, pt: '3px', alignSelf: 'flex-start' }} onClick={handleClickCollapse}>
          <IconButton
            sx={{
              cursor: 'pointer',
              '&:hover': {
                background: 'none',
              },
            }}
            disableRipple
            aria-label="edit"
            color="inherit"
            size="small"
          >
            {show ? <Remove fontSize="small" /> : <Add fontSize="small" />}
          </IconButton>
        </Box>
        <Box>
          <Stack sx={{ alignItems: 'center' }} direction="row">
            <TruncatedBox
              sx={{
                fontSize: 'subtitle1.fontSize',
                fontWeight: 'fontWeightBold',

                cursor: 'pointer',
                userSelect: 'none',
              }}
              onClick={handleClickCollapse}
            >
              {choice.name}
            </TruncatedBox>
            <Box sx={{ display: 'flex', flexWrap: 'nowrap', pl: 1 }}>
              <IconButton aria-label="edit" color="inherit" size="small" onClick={handleEditChoice}>
                <Edit fontSize="small" />
              </IconButton>
              {dish ? (
                <IconButton aria-label="edit" color="inherit" size="small" onClick={handleRemoveChoice}>
                  <Delete fontSize="small" />
                </IconButton>
              ) : null}
            </Box>
            <Box sx={{ pl: 1 }}>
              <Button size="small" variant="outlined" color="inherit" endIcon={<Add />} onClick={handleAddSubs}>
                Option
              </Button>
            </Box>
          </Stack>
          <TruncatedBox
            sx={{
              mt: '-4px',
              pt: 1,

              lineHeight: '24px',
            }}
            fontSize="subtitle2.fontSize"
            fontStyle="italic"
          >
            {choice.desc}
          </TruncatedBox>
        </Box>
      </Box>
      <Collapse in={show}>
        <Box sx={{ pl: 1, pr: 2 }}>
          <ChoiceSubs choice={choice} />
        </Box>
      </Collapse>
      <EditChoice open={editChoiceOpen} setOpen={setEditChoiceOpen} choice={choice} />
      <AddSubModal open={addSubOpen} setOpen={setAddSubOpen} choiceId={choiceId} />
    </Paper>
  );
}

export default Choice;
