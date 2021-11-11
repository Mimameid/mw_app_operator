import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeChoice } from 'features/menus/dishes/actions';

import { Box, Button, Collapse, IconButton, Paper, Stack } from '@mui/material';
import ChoiceSubs from './ChoiceSubs';
import EditChoice from './EditChoice';
import SetSubsModal from 'features/menus/choices/components/SetSubsModal/SetSubsModal';
import TruncatedBox from 'features/menus/common/components/TruncatedBox';
import { Add, Delete, Edit, Remove } from '@mui/icons-material';

function Choice({ choiceId, dish }) {
  const dispatch = useDispatch();
  const choice = useSelector((state) => state.menus.choices.byId[choiceId]);

  const [show, setShow] = useState(true);
  const [editChoiceOpen, setEditChoiceOpen] = useState(false);
  const [setSubsOpen, setSetSubsOpen] = useState(false);

  function handleEditChoice() {
    setEditChoiceOpen(true);
  }

  const handleRemoveChoice = (event) => {
    dispatch(removeChoice({ choiceId, dishId: dish.id }));
  };

  function handleSetSubs() {
    setSetSubsOpen(true);
  }

  function handleClickCollapse() {
    setShow(!show);
  }

  return (
    <Paper>
      <Box
        sx={{
          p: 2,

          bgcolor: 'primary.main',
          color: 'common.white',
          borderBottom: (theme) => '1px solid ' + theme.palette.primary.main,
        }}
        display="flex"
      >
        <Box sx={{ width: '24px', ml: -1, alignSelf: 'flex-start' }} onClick={handleClickCollapse}>
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
              <Button size="small" variant="outlined" color="inherit" endIcon={<Add />} onClick={handleSetSubs}>
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
      <EditChoice open={editChoiceOpen} onClose={() => setEditChoiceOpen(false)} choice={choice} />
      <SetSubsModal open={setSubsOpen} setOpen={setSetSubsOpen} choice={choice} />
    </Paper>
  );
}

export default Choice;
