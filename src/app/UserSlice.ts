import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import axios from "axios";

type UserType = {

    id?: string;

    name: string;

    email: string;

}

type initialStateType = {

    loading: boolean;

    error: string;

    users: UserType[];

    addUserStatus: string;

    updateUserStatus: string;

    deleteUserStatus: string;

}

const initialState: initialStateType = {

    loading: false,

    error: "",

    users: [],

    addUserStatus: "",

    updateUserStatus: "",

    deleteUserStatus: ""

}

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {

    const response = await axios.get("http://localhost:3000/users");

    return response.data;

});

export const addUser = createAsyncThunk("user/addUser", async (data: UserType) => {

    const response = await axios.post("http://localhost:3000/users", data);

    return response.data;

});

export const updateUser = createAsyncThunk("user/updateUser", async (data: UserType) => {

    const response = await axios.put(`http://localhost:3000/users/${ data.id }`, data);

    return response.data;

});

export const deleteUser = createAsyncThunk("user/deleteUser", async (id: string) => {

    await axios.delete(`http://localhost:3000/users/${ id }`);

    return id;

});

const userSlice = createSlice({

    name: "user",

    initialState,

    reducers: {},

    extraReducers: builder => {

        builder
        
        .addCase(fetchUsers.pending, (state) => { 
            
            state.loading = true; 
        
        }).addCase(fetchUsers.fulfilled, (state, action: PayloadAction<UserType[]>) => {

            state.loading = false;

            state.error = "";

            state.users = action.payload;
            
        }).addCase(fetchUsers.rejected, (state, action) => {

            state.loading = false;

            state.error = action.error.message || "Something Wrong!";

            state.users = [];

        }).addCase(addUser.pending, (state) => { 
            
            state.addUserStatus = "loading";
        
        }).addCase(addUser.fulfilled, (state) => {

            state.addUserStatus = "success";
            
        }).addCase(addUser.rejected, (state) => {

            state.addUserStatus = "error";

        }).addCase(updateUser.pending, (state) => { 
            
            state.updateUserStatus = "loading";
        
        }).addCase(updateUser.fulfilled, (state) => {

            state.updateUserStatus = "success";
            
        }).addCase(updateUser.rejected, (state) => {

            state.updateUserStatus = "error";

        }).addCase(deleteUser.pending, (state) => { 
            
            state.deleteUserStatus = "loading";
        
        }).addCase(deleteUser.fulfilled, (state) => {

            state.deleteUserStatus = "success";
            
        }).addCase(deleteUser.rejected, (state) => {

            state.deleteUserStatus = "error";

        });

    }

});

export default userSlice.reducer;
