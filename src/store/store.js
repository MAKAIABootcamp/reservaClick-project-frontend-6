import { Tuple, configureStore } from '@reduxjs/toolkit';
import userReducer from './users/userSlice';
import { thunk } from 'redux-thunk';
import logger from 'redux-logger';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: () => new Tuple(thunk, logger),
});

export default store;
