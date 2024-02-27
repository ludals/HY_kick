import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: "user",
  initialState: {
    value: {
      name: null,
      team_id: null,
      team_name: null,
      position: null, //직책
      jersey_number: null,
      student_number: null,
    }
  },
  reducers: {
    loginAction: (state, action) => {
      state.value.name = action.payload.name;
      state.value.team_id = action.payload.team_id;
      state.value.position = action.payload.position;
      state.value.jersey_number = action.payload.jersey_number;
      state.value.student_number = action.payload.student_number;
    },
  },
});

export const { loginAction } = userSlice.actions;
export default userSlice.reducer;