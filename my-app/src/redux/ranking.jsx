import { createSlice } from "@reduxjs/toolkit";

const rankingSlice = createSlice({
    name: "ranking",
    initialState: {
        value: {
            ranking: []
        }
    },
    reducers: {
        load_ranking: (state, action) => {
            state.value.ranking = action.payload;
        },
    }
});

export const {load_ranking} = rankingSlice.actions;
export default rankingSlice.reducer;