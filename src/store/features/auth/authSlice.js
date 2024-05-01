import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    customer: null,
    staff: null,
  },
  reducers: {
    setCustomer: (state, action) => {
      state.customer = action.payload;
    },
    setStaff: (state, action) => {
      state.staff = action.payload;
    },
  },
});

export const { setCustomer, setStaff } = authSlice.actions;

export default authSlice.reducer;
