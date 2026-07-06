import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../axios/axios"
const initialState = {
  isLoading:false,
  isPredectiveloading:false,
  message:[],
  predectiveMessage:[],
  smartReply:[]
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
export const archievedMessageAsync = createAsyncThunk(
  "message/archievedMessage",
  async ({data}) => {    
    try {
      const res = await api.get("archieved/archievedMessage",{
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


export const predectiveMessageAsync = createAsyncThunk(
  "message/predectiveAsync",
  async ({data}) => {
    try {
      const res = await api.post("ai/predictive", data,{
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








export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
     messageHandler:(state,action)=>{
      state.message=[...state.message,action.payload]
     },
     handlePredectiveMessage:(state,action)=>{
      state.predectiveMessage=[]
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
    builder.addCase(archievedMessageAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(archievedMessageAsync.fulfilled, (state, action) => {
      state.isLoading = false; 
      state.message=[...action.payload.messages,...state.message]

    });
    builder.addCase(archievedMessageAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(predectiveMessageAsync.pending, (state) => {
      state.isPredectiveloading = true;
    });
    builder.addCase(predectiveMessageAsync.fulfilled, (state, action) => {
      state.isPredectiveloading = false; 
      state.predectiveMessage=action.payload.text;

    });
    builder.addCase(predectiveMessageAsync.rejected, (state, action) => {
      state.isPredectiveloading = false;
      state.error = action.error.message;
    });
   

    
        

    
    
   
   
   
  },
});
export default messageSlice.reducer;

export const {messageHandler,handlePredectiveMessage}=messageSlice.actions;