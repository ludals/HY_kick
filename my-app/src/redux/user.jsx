import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: "user",
    initialState: { 
        value: {
            id: 1,
            name: '',
            email: '',
            team_id: '',
            position: '', //직책
            jersey_number: '',
            student_number: '',
        }
    },
    reducers: {
        login: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const {login} = userSlice.actions;
export default userSlice.reducer;