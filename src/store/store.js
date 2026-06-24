import { configureStore } from '@reduxjs/toolkit';
import userReducer  from "../feature/userSlice.js";
import messageReducer from "../feature/messageSlice.js"
export const store = configureStore({
  reducer: {
   user:userReducer,
   message:messageReducer
  
  },
})