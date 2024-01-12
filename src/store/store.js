import { Tuple, configureStore } from '@reduxjs/toolkit';
import userReducer from './users/userSlice';
import storeReducer from './stores/storeSlice';
import { thunk } from 'redux-thunk';
import logger from 'redux-logger';

const store = configureStore({
  reducer: {
    user: userReducer,
    store: storeReducer,
  },
  middleware: () => new Tuple(thunk, logger),
});

export default store;
