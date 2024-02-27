import { createSlice } from "@reduxjs/toolkit";

const teamsSlice = createSlice({
  name: "teams",
  initialState: {
    value: {
      teams: []
    }
  },
  reducers: {
    load_teams: (state, action) => {
      state.value.teams = action.payload;
    },
  }
});

export const { load_teams } = teamsSlice.actions;
export default teamsSlice.reducer;