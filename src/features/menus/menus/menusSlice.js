import { createAction, createReducer, createSelector } from '@reduxjs/toolkit';
import { addDish, removeDish, deleteCategory } from '../categories/categoriesSlice';

// actions
const setMenus = createAction('menus/setMenus');
const createMenu = createAction('menus/createMenu');
const deleteMenu = createAction('menus/deleteMenu');
const editMenu = createAction('menus/editMenu');
const addCategory = createAction('menus/addCategory');
const removeCategory = createAction('menus/removeCategory');

// reducer
const initialState = {
  byId: {},
};

const menusReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setMenus, (state, action) => {
      state.byId = action.payload.menus;
      state.idCounter = action.payload.idCounter;
    })
    .addCase(createMenu, (state, action) => {
      state.byId[action.payload.id] = {
        id: action.payload.id,
        name: action.payload.name,
        desc: action.payload.description,
        categories: [],
        created: Date.now(),
      };
    })
    .addCase(deleteMenu, (state, action) => {
      delete state.byId[action.payload];
    })
    .addCase(editMenu, (state, action) => {
      const menu = state.byId[action.payload.id];
      menu.name = action.payload.name;
      menu.desc = action.payload.description;
    })
    .addCase(addCategory, (state, action) => {
      const newCategory = action.payload.categoryId;
      const currentMenuCategories = state.byId[action.payload.menuId].categories;

      if (currentMenuCategories.indexOf(newCategory) < 0) {
        currentMenuCategories.push(newCategory);
      }
    })
    .addCase(removeCategory, (state, action) => {
      const currentMenu = state.byId[action.payload.menuId];
      const index = currentMenu.categories.indexOf(action.payload.categoryId);
      currentMenu.categories.splice(index, 1);
    })
    // extra reducers
    .addCase(deleteCategory, (state, action) => {
      const menus = Object.values(state.byId);
      for (let menu of menus) {
        const index = menu.categories.indexOf(action.payload);
        if (index > -1) {
          menu.categories.splice(index, 1);
        }
      }
    });
});

// selectors
export const makeSelectAffectedMenus = () =>
  createSelector(
    (state) => state.menus.menus.byId,
    (_, categoryId) => categoryId,
    (byId, categoryId) => {
      const menusArray = Object.values(byId);

      let affectedMenus = [];
      for (let menu of menusArray) {
        if (menu.categories.includes(categoryId)) {
          affectedMenus.push([menu.id, menu.name]);
        }
      }

      return affectedMenus;
    },
  );

export const selectMenuIdsToNames = createSelector(
  (state) => state.menus.menus.byId,
  (byId) => {
    const menuArray = Object.values(byId);
    const menuIdToNames = menuArray.map((elem, _) => {
      return [elem.id, elem.name];
    });

    return menuIdToNames;
  },
);

export { setMenus, createMenu, deleteMenu, editMenu, addCategory, removeCategory, addDish, removeDish };
export default menusReducer;
