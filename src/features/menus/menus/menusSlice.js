import { createAction, createReducer, isAnyOf, createSelector, current } from '@reduxjs/toolkit';
import { addDish, removeDish, deleteCategory, editCategory, selectCategory } from '../categories/categoriesSlice';
import { deleteDish } from '../dishes/dishesSlice';

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
        categories: {},
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
      state.activeMenu.categories[action.payload.id] = action.payload;
    })
    .addCase(removeCategory, (state, action) => {
      delete state.activeMenu.categories[action.payload];
    })
    .addCase(selectCategory, (state, action) => {
      state.activeCategoryId = action.payload;
    })
    // extra reducers
    .addCase(addDish, (state, action) => {
      state.activeMenu.categories[state.activeCategoryId].dishes[action.payload.id] = action.payload;
    })
    .addCase(removeDish, (state, action) => {
      delete state.activeMenu.categories[state.activeCategoryId].dishes[action.payload.id];
    })
    .addCase(deleteCategory, (state, action) => {
      const menus = Object.values(state.byId);
      for (let menu of menus) {
        delete menu.categories[action.payload];
      }
      // delete from active menu if not stored yet
      delete state.activeMenu.categories[action.payload];
    })
    .addCase(editCategory, (state, action) => {
      state.activeMenu.categories[action.payload.id].name = action.payload.name;
      state.activeMenu.categories[action.payload.id].name = action.payload.name;

      state.byId[action.payload.id].name = state.byId[action.payload.id].desc = action.payload.description;
    })
    .addCase(deleteDish, (state, action) => {
      const menus = Object.values(state.byId);
      for (let menu of menus) {
        const categories = Object.values(menu.categories);
        for (let category of categories) {
          delete category.dishes[action.payload];
        }
      }
      delete state.activeMenu.categories[state.activeCategoryId].dishes[action.payload];
    })
    .addMatcher(
      isAnyOf(createMenu, editMenu, addCategory, removeCategory, addDish, deleteDish, removeDish),
      (state, action) => {
        state.byId[state.activeMenu.id] = state.activeMenu;
      },
    );
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
        if (Object.keys(menu.categories).includes(categoryId.toString())) {
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
