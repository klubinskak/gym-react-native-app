import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice';
import userInfoReducer from './userInfoSlice';

export const store = configureStore({
    reducer: {
      user: userReducer,
      userInfo: userInfoReducer,
    },
  })