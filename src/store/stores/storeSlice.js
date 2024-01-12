import { createSlice } from '@reduxjs/toolkit';

const storeSlice = createSlice({
  name: 'store',
  initialState: {
    stores: [],
    selectedStore: null,
    error: null,
  },
  reducers: {
    setStores: (state, action) => {
      state.stores = action.payload;
    },
    setSelectedStore: (state, action) => {
      state.selectedStore = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setStores, setSelectedStore, setError } = storeSlice.actions;

export default storeSlice.reducer;
