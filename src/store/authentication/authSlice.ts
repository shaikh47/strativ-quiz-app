import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authentication",
  initialState: {
    counter: 0,
  },
  reducers: {
    increment: (state, action) => {
      console.log(state, action);
      state.counter = state.counter + action.payload;
      return state;
    },
  },
});

export const { increment } = authSlice.actions;
export default authSlice.reducer;
