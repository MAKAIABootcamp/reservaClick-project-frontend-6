import { createSlice } from '@reduxjs/toolkit';

const reservationSlice = createSlice({
  name: 'reservation',
  initialState: {
    reservations: [],
    error: null,
  },
  reducers: {
    setReservations: (state, action) => {
      state.reservations = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setReservations, setError } = reservationSlice.actions;

export default reservationSlice.reducer;
