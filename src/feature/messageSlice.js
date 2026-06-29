import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../axios/axios"
const initialState = {
  isLoading:false,
  message:[]
};


export const sendMessageAsync = createAsyncThunk(
  "message/sendMessage",
  async ({data}) => {
    
    try {
      const res = await api.post("message/sendMessage", data,{
        headers: {
          "Content-Type": "application/json",
        }
      });      
      return res.data;
    } catch (error) {
      console.log(error,"dfvdhsfkjsdkb");
      throw error;
    }
  }
);

export const recieveMessageAsync = createAsyncThunk(
  "message/recieveMessage",
  async ({data}) => {    
    try {
      const res = await api.get("message/recieveMessage",{
        headers: {
          "Content-Type": "application/json",
        },
        params:{
          ...data
        }
      });      
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
export const sendMediaFileAsync = createAsyncThunk(
  "message/mediaAsync",
  async ({formdata}) => {    
    try {
      const res = await api.post("message/media",formdata,{
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });      
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
     messageHandler:(state,action)=>{
      state.message=[...state.message,action.payload]
     }
  },
  extraReducers: (builder) => {
    builder.addCase(sendMessageAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(sendMessageAsync.fulfilled, (state, action) => {
      state.isLoading = false;   
      
    });
    builder.addCase(sendMessageAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    
     builder.addCase(recieveMessageAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(recieveMessageAsync.fulfilled, (state, action) => {
      state.isLoading = false; 
      state.message=action.payload.messages

    });
    builder.addCase(recieveMessageAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(sendMediaFileAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(sendMediaFileAsync.fulfilled, (state, action) => {
      state.isLoading = false; 
    });
    builder.addCase(sendMediaFileAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    
   
   
   
  },
});
export default messageSlice.reducer;

export const {messageHandler}=messageSlice.actions;