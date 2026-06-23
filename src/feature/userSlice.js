import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../axios/axios";

const initialState = {
  
};


export const fetchVerifyotpAsync = createAsyncThunk(
  "auth/verifyOtp",
  async ({data}) => {
    try {
      const res = await api.post("/user/verify", data,{
        headers: {
          "Content-Type": "application/json",
        }
      });      
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder.addCase(fetchVerifyotpAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchVerifyotpAsync.fulfilled, (state, action) => {
      state.isLoading = false;   
      state.email=action.payload?.data?.email;   
    });
    builder.addCase(fetchVerifyotpAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
   
   
  },
});
export default userSlice.reducer;