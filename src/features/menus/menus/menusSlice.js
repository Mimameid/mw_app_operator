import { createAction, createReducer, isAnyOf, createSelector } from '@reduxjs/toolkit';
import { addDish, removeDish, deleteCategory, selectCategory } from '../categories/categoriesSlice';

// actions
const setMenus = createAction('menus/setMenus');
const createMenu = createAction('menus/createMenu');
const deleteMenu = createAction('menus/deleteMenu');
const editMenu = createAction('menus/editMenu');
const selectMenu = createAction('menus/selectMenu');
const addCategory = createAction('menus/addCategory');
const removeCategory = createAction('menus/removeCategory');

// reducer
const initialState = {
  idCounter: 0,
  byId: {},
  activeMenu: null, // the one currently visualized in the UI
  activeCategoryId: 0,
};

const menusReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setMenus, (state, action) => {
      state.byId = action.payload.menus;
      state.idCounter = action.payload.idCounter;
    })
    .addCase(createMenu, (state, action) => {
      state.idCounter++;
      state.activeMenu = {
        id: state.idCounter,
        name: action.payload.name,
        desc: action.payload.description,
        categories: [],
        created: Date.now(),
      };
    })
    .addCase(deleteMenu, (state, action) => {
      delete state.byId[action.payload];
      state.activeMenu = null;
    })
    .addCase(editMenu, (state, action) => {
      state.activeMenu.name = action.payload.name;
      state.activeMenu.desc = action.payload.description;
    })
    .addCase(selectMenu, (state, action) => {
      state.activeMenu = state.byId[action.payload];
    })
    .addCase(addCategory, (state, action) => {
      const newCategory = action.payload;
      const currentMenuCategories = state.activeMenu.categories;

      if (currentMenuCategories.indexOf(newCategory) < 0) {
        currentMenuCategories.push(newCategory);
      }
    })
    .addCase(removeCategory, (state, action) => {
      const index = state.activeMenu.categories.indexOf(action.payload);
      state.activeMenu.categories.splice(index, 1);
    })
    .addCase(selectCategory, (state, action) => {
      state.activeCategoryId = action.payload;
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

      // delete from active menu if not stored yet
      const index = state.activeMenu.categories.indexOf(action.payload);
      if (index > -1) {
        state.activeMenu.categories.splice(index, 1);
      }
    })
    .addMatcher(isAnyOf(createMenu, editMenu, addCategory, removeCategory, deleteCategory), (state, action) => {
      state.byId[state.activeMenu.id] = state.activeMenu;
    });
});

// selectors
const makeSelectAffectedMenus = () =>
  createSelector(
    (state) => state.menus.menus.byId,
    (_, categoryId) => categoryId,
    (byId, categoryId) => {
      const menusArray = Object.values(byId);

      let affectedMenus = [];
      for (let menu of menusArray) {
        if (menu.categories.includes(categoryId)) {
          affectedMenus.push(menu.name);
        }
      }

      return affectedMenus;
    },
  );

export {
  setMenus,
  createMenu,
  deleteMenu,
  editMenu,
  selectMenu,
  addCategory,
  removeCategory,
  selectCategory,
  addDish,
  removeDish,
  makeSelectAffectedMenus,
};
export default menusReducer;
