import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../axios/axios"
import Cookies from "js-cookie"
const token=Cookies.get("token");
const userId=Cookies.get("userId")
const initialState = {
  token:token || null,
  isLoading:false,
  userId:userId || null,
  user:[],
  profile:{}

};


export const signUpHandlerAsync = createAsyncThunk(
  "user/signUp",
  async ({data}) => {
    console.log(data,"dfs fsjkdbjs");
    
    try {
      const res = await api.post("users/signup", data,{
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

export const loginHandlerAsync = createAsyncThunk(
  "user/login",
  async ({data}) => {    
    try {
      const res = await api.post("users/login", data,{
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
export const getUserAsync = createAsyncThunk(
  "user/getUser",
  async ({data}) => {    
    try {
      const res = await api.get("users/getUser",{
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


export const getProfile = createAsyncThunk(
  "user/getProfile",
  async ({token}) => {
    try {
      const res = await api.get("users/getProfile",{
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`
        }
      });      
      return res.data;
    } catch (error) {
      console.log(error,"dfvdhsfkjsdkb");
      throw error;
    }
  }
);

export const updateProfileAsync = createAsyncThunk(
  "user/updateProfile",
  async ({token,data,userId}) => {
    try {
      const res = await api.put(`users/updateUser/${userId}`,data,{
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`
        }
      });      
      return res.data;
    } catch (error) {
      console.log(error,"dfvdhsfkjsdkb");
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
    builder.addCase(signUpHandlerAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signUpHandlerAsync.fulfilled, (state, action) => {
      state.isLoading = false;   
      
    });
    builder.addCase(signUpHandlerAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
     builder.addCase(loginHandlerAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginHandlerAsync.fulfilled, (state, action) => {
      state.isLoading = false; 
      state.token=action.payload.token;
      state.userId=action.payload.user[0].id;
      Cookies.set("token",action.payload.token)
      Cookies.set("userId",action.payload.user[0].id)
      Cookies.set("senderMail",action.payload.user[0].email)

    });
    builder.addCase(loginHandlerAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
     builder.addCase(getUserAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload,"sdfjdfsjkb");
       
      state.user=action.payload.users

    });
    builder.addCase(getUserAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

     builder.addCase(getProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.isLoading = false;             
      state.profile=action.payload.user;

    });
    builder.addCase(getProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
     builder.addCase(updateProfileAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateProfileAsync.fulfilled, (state, action) => {
      state.isLoading = false;             

    });
    builder.addCase(updateProfileAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
     
        
    
   
   
   
  },
});
export default userSlice.reducer;