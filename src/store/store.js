import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import { loadState, saveState } from './localStorage';
import { throttle } from '../utils/utils';

const initialState = loadState();
const middleware = [thunk];

// dev tools middleware
/* eslint-disable no-underscore-dangle */
let devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
if (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production') {
  devTools = (a) => a;
}

const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware), devTools));
store.subscribe(
  throttle(() => {
    // specify reducers that shall be stored (currently the whole store is persisted)
    saveState(store.getState());
  }),
  1000,
);

export default store;
