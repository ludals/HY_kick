import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user'
import matchReducer from './match';
import teamsReducer from './teams';

export default configureStore({
  reducer: {
    user: userReducer,
    match: matchReducer,
    teams: teamsReducer,
  },
});