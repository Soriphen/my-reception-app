import { createSlice } from "@reduxjs/toolkit";

const studiosSlice = createSlice({
  name: "studios",
  initialState: [],
  reducers: {
    setStudios: (state, action) => {
      return action.payload;
    },
  },
});

export const { setStudios } = studiosSlice.actions;

export default studiosSlice.reducer;
