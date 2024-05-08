import { createSlice } from "@reduxjs/toolkit";

const reservationsSlice = createSlice({
  name: "reservations",
  initialState: { reservations: [], upcomingReservation: [] },
  reducers: {
    setReservations: (state, action) => {
      return {
        ...state,
        reservations: action.payload,
      };
    },
    addReservation: (state, action) => {
      return {
        ...state,
        reservations: [...state.reservations, action.payload],
      };
    },
    deleteReservation: (state, action) => {
      return {
        ...state,
        reservations: state.reservations.filter(
          (reservation) => reservation.id !== action.payload
        ),
      };
    },
    setUpcomingReservation: (state, action) => {
      return {
        ...state,
        upcomingReservation: action.payload,
      };
    },
  },
});

export const {
  setReservations,
  addReservation,
  deleteReservation,
  setUpcomingReservation,
} = reservationsSlice.actions;

export default reservationsSlice.reducer;
