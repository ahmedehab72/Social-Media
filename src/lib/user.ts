'use client'

import UserContext from "@/context/UserContext";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = { userInfo: [], userPhoto: [], responesData: [], isError: false, isUpload: false }


export let getUserInfo = createAsyncThunk('userSlice/getUserInfo', async () => {
    let response = await fetch(`https://linked-posts.routemisr.com/users/profile-data`, {
        method: 'GET',
        headers: { token: localStorage.getItem('userToken') },
    });
    let data = await response.json();
    // console.log(data);
    return data;
})

export let changeProfilePhoto = createAsyncThunk('userSlice/changeProfilePhoto', async (formData: any) => {
    let response = await fetch(`https://linked-posts.routemisr.com/users/upload-photo`, {
        method: 'PATCH',
        headers: { token: localStorage.getItem('userToken') },
        body: formData,
    });
    let data = await response.json();
    console.log(data);
    return data;
})

export let changePassword = createAsyncThunk('userSlice/changePassword', async (dataa: any) => {
    console.log(dataa);

    return axios.patch(`https://linked-posts.routemisr.com/users/change-password`, {
        password: dataa.password,
        newPassword: dataa.newPassword,
    }, {
        headers: { token: localStorage.getItem('userToken') }
    })
        .then((response) => {
            console.log(response);
            return response
        })
        .catch((err) => {
            console.log(err);
            return err
        })
})


let userSlice = createSlice({
    name: 'userSlice',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getUserInfo.fulfilled, (state, action) => {
            // console.log(state);
            // console.log(action.payload.user);
            state.userInfo = action.payload.user
        })
        builder.addCase(changeProfilePhoto.fulfilled, (state, action) => {
            // console.log(state);
            console.log(action);
            state.userPhoto = action?.meta?.requestId
            state.isUpload = true
        })
        builder.addCase(changePassword.fulfilled, (state, action) => {
            console.log(action);
            state.responesData = action.payload.data

        })
    }
})

export let userReducer = userSlice.reducer