import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: "user",
  initialState: {
    value: {
      id: null,
      name: null,
      email: null,
      team_id: null,
      position: null, //직책
      jersey_number: null,
      student_number: null,
    }
  },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;