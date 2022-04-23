import { createSelector, createSlice } from '@reduxjs/toolkit';
import { fetchShop } from 'features/shop/shop/actions';
import {
  fetchAllOffers,
  createOffer,
  updateOffer,
  deleteOffer,
  setCategories,
  removeCategory,
  activateOffer,
} from './actions';
import { createCategory, updateCategory } from '../categories/actions';

// reducer
const initialState = {
  byId: {},
};

const slice = createSlice({
  name: 'offers',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOffers.fulfilled, (state, action) => {
        state.byId = action.payload.offers;
      })
      .addCase(fetchShop.fulfilled, (state, action) => {
        state.byId = action.payload.offers;
      })
      .addCase(createOffer.fulfilled, (state, action) => {
        state.byId[action.payload.id] = action.payload;
      })
      .addCase(activateOffer.fulfilled, (state, action) => {
        for (const offer of Object.values(state.byId)) {
          if (offer.isActive) {
            offer.isActive = false;
          }
        }

        const offer = state.byId[action.payload.offerId];
        offer.isActive = true;
      })
      .addCase(updateOffer.fulfilled, (state, action) => {
        state.byId[action.payload.id] = action.payload;
      })
      .addCase(deleteOffer.fulfilled, (state, action) => {
        delete state.byId[action.payload];
      })
      .addCase(setCategories.fulfilled, (state, action) => {
        const offer = state.byId[action.payload.offerId];
        offer.categories = action.payload.categories;
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        const offer = state.byId[action.payload.offerId];
        const index = offer.categories.indexOf(action.payload.categoryId);
        if (index > -1) {
          offer.categories.splice(index, 1);
        }
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        for (let offerId of action.payload.offers) {
          state.byId[offerId].categories.push(action.payload.category.id);
        }
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const offers = Object.values(state.byId);
        for (let offer of offers) {
          const index = offer.categories.indexOf(action.payload.category.id);
          if (index > -1) {
            offer.categories.splice(index, 1);
          }
        }
        for (let offerId of action.payload.offers) {
          state.byId[offerId].categories.push(action.payload.category.id);
        }
      });
  },
});

// selectors
export const makeSelectAffectedOffers = () =>
  createSelector(
    (state) => state.offers.offers.byId,
    (_, categoryId) => categoryId,
    (byId, categoryId) => {
      const offersArray = Object.values(byId);

      let affectedOffers = [];
      for (let offer of offersArray) {
        if (offer.categories.includes(categoryId)) {
          affectedOffers.push([offer.id, offer.name]);
        }
      }

      return affectedOffers;
    },
  );

export const selectOfferIdsToNames = createSelector(
  (state) => state.offers.offers.byId,
  (byId) => {
    const offerArray = Object.values(byId);
    const offerIdToNames = offerArray.map((elem, _) => {
      return [elem.id, elem.name];
    });

    return offerIdToNames;
  },
);

export const selectActiveOffer = createSelector(
  (state) => state.offers.offers.byId,
  (byId) => {
    const offersArray = Object.values(byId);
    return offersArray.find((offer) => offer.isActive === true);
  },
);

export const selectHasDishes = createSelector(
  (state) => state.offers.categories.byId,
  (_, offer) => offer,
  (categories, offer) => {
    for (const categoryId of offer.categories) {
      if (categories[categoryId].dishes.length) {
        return true;
      }
    }

    return false;
  },
);

export default slice.reducer;
