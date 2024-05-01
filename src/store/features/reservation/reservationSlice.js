import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedSlot: null,
};

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    setSelectedSlot: (state, action) => {
      state.selectedSlot = action.payload;
    },
  },
});

export const { setSelectedSlot } = reservationSlice.actions;

export default reservationSlice.reducer;
