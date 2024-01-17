import { Tuple, configureStore } from '@reduxjs/toolkit';
import userReducer from './users/userSlice';
import storeReducer from './stores/storeSlice';
import reservationReducer from './reservations/reservationSlice';
import { thunk } from 'redux-thunk';
import logger from 'redux-logger';

const store = configureStore({
  reducer: {
    user: userReducer,
    store: storeReducer,
    reservation: reservationReducer,
  },
  middleware: () => new Tuple(thunk, logger),
});

export default store;
