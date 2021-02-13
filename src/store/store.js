import { createStore } from 'redux';
import rootReducer from './rootReducer';

const initialState = {};

// dev tools middleware
/* eslint-disable no-underscore-dangle */
let devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
if (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production') {
  devTools = (a) => a;
}

const store = createStore(rootReducer, initialState, devTools);

export default store;
