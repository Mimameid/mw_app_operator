import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectActiveOffer } from '../slice';

import { Box, Button, Grid, Paper, IconButton, Collapse } from '@mui/material';
import OfferCategories from 'features/offers/offers/components/OfferCategories';
import SetCategoriesModal from 'features/offers/offers/components/SetCategoriesModal/SetCategoriesModal';

import OfferModal from './OfferModal';
import TruncatedBox from 'features/offers/common/components/TruncatedBox';
import { Add, Edit, Remove } from '@mui/icons-material';

function Offer() {
  const offerId = useSelector((state) => state.offers.views.itemId);
  const offer = useSelector((state) => state.offers.offers.byId[offerId]);
  const activeOffer = useSelector(selectActiveOffer);

  const [show, setShow] = useState(true);
  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const [setCategoriesOpen, setSetCategoriesOpen] = useState(false);

  function handleEditOffer(event) {
    setOfferModalOpen(true);
  }

  function handleSetCategories(event) {
    setSetCategoriesOpen(true);
  }

  function handleClickCollapse() {
    setShow(!show);
  }

  return (
    <Paper>
      {offerId ? (
        <React.Fragment>
          <Box
            sx={{
              display: 'flex',
              p: 2,

              borderBottom: (theme) => '1px solid ' + theme.palette.grey[300],
            }}
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
                size="small"
              >
                {show ? <Remove fontSize="small" /> : <Add fontSize="small" />}
              </IconButton>
            </Box>
            <Box flexGrow={1}>
              <Grid container alignItems="center">
                <TruncatedBox
                  sx={{ cursor: 'pointer', userSelect: 'none' }}
                  fontSize="subtitle1.fontSize"
                  fontWeight="fontWeightBold"
                  onClick={handleClickCollapse}
                >
                  {offer.name}
                </TruncatedBox>
                <Grid item sx={{ pl: 1 }}>
                  <IconButton aria-label="edit" size="small" onClick={handleEditOffer}>
                    <Edit fontSize="small" />
                  </IconButton>
                </Grid>
                <Grid item sx={{ pl: 1 }}>
                  <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    endIcon={<Add />}
                    onClick={handleSetCategories}
                  >
                    Kategorie
                  </Button>
                </Grid>

                <Box
                  sx={{
                    pl: 1,
                    color: activeOffer?.id === offer.id ? 'success.main' : 'grey.500',
                    fontStyle: 'italic',
                    flexGrow: 1,
                    textAlign: 'right',
                  }}
                >
                  {activeOffer?.id === offer.id ? 'aktiv' : 'inaktiv'}
                </Box>
              </Grid>
              <TruncatedBox
                sx={{
                  mt: '-4px',
                  pt: 1,

                  color: 'text.secondary',
                  fontSize: 'subtitle2.fontSize',
                  fontStyle: 'italic',
                  lineHeight: '24px',
                }}
              >
                {offer.desc}
              </TruncatedBox>
            </Box>
          </Box>

          <Collapse in={show}>
            <OfferCategories offer={offer} />
          </Collapse>

          <SetCategoriesModal open={setCategoriesOpen} setOpen={setSetCategoriesOpen} offer={offer} />
          <OfferModal open={offerModalOpen} onClose={() => setOfferModalOpen(false)} offer={offer} />
        </React.Fragment>
      ) : null}
    </Paper>
  );
}

export default Offer;
