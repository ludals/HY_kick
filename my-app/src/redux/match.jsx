import { createSlice } from "@reduxjs/toolkit";

const matchSlice = createSlice({
    name: "match",
    initialState: {
        value: {
            match:[],
        }
    },
    reducers: {
        load_match: (state, action) => {
            state.value.match = action.payload;
        },
    }
});

export const {load_match} = matchSlice.actions;
export default matchSlice.reducer;