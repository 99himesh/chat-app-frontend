import { configureStore } from '@reduxjs/toolkit';
import userReducer  from "../feature/userSlice.js";

export const store = configureStore({
  reducer: {
   auth:userReducer
  
  },
})