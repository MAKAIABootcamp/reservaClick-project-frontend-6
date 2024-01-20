import { createSlice } from '@reduxjs/toolkit';

const reservationSlice = createSlice({
  name: 'reservation',
  initialState: {
    reservations: [],
    reservationToEdit: null,
    error: null,
  },
  reducers: {
    setReservations: (state, action) => {
      state.reservations = action.payload;
    },
    setReservationToEdit: (state, action) => {
      state.reservationToEdit = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setReservations, setReservationToEdit, setError } =
  reservationSlice.actions;

export default reservationSlice.reducer;
