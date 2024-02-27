import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: "user",
  initialState: {
    value: {
      name: null,
      team_id: null,
      position: null, //직책
      jersey_number: null,
      student_number: null,
    }
  },
  reducers: {
    loginAction: (state, action) => {
      state.value = { ...action.payload };
    },
  },
});

export const { loginAction } = userSlice.actions;
export default userSlice.reducer;