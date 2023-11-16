import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user'
import matchReducer from './match';
import rankingReducer from './ranking';

export default configureStore({
    reducer:{
        user: userReducer,
        match: matchReducer,
        ranking: rankingReducer,
    },
});