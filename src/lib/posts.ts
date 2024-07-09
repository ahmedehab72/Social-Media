import { getAllComments } from '@/lib/comments';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let headers: any = { token: localStorage.getItem('userToken') }
let initialState = { allPosts: [], isLoading: false, userPosts: [], allComments: [], isCreate: false, addedComment: false }

export let getAllPosts = createAsyncThunk('postsSlice/getAllPosts', async () => {
    let response = await fetch(`https://linked-posts.routemisr.com/posts?limit=50`, {
        method: 'GET',
        headers: headers,
    });
    let data = await response.json()
    // console.log(data);
    return data
})

export let createPosts = createAsyncThunk('postsSlice/createPosts', async (formData) => {
    console.log(formData);

    let response = await fetch(`https://linked-posts.routemisr.com/posts`, {
        method: 'POST',
        headers: headers,
        body: formData,
    });
    let data = await response.json()
    console.log(data);
    return data
})

export let deletePost = createAsyncThunk('postsSlice/deletePost', async (postId) => {

    let response = await fetch(`https://linked-posts.routemisr.com/posts/${postId}`, {
        method: 'DELETE',
        headers: headers,
    });
    let data = await response.json()
    console.log(data);
    return data
})

export let getUserPosts = createAsyncThunk('postsSlice/getUserPosts', async (userId) => {

    let response = await fetch(`https://linked-posts.routemisr.com/users/${userId}/posts?limit=5`, {
        method: 'GET',
        headers: headers,
    });
    let data = await response.json()
    // console.log(data);
    return data
})

export let createComment = createAsyncThunk('postsSlice/createComment', (data: any): any => {
    // console.log(data);
    return axios.post(`https://linked-posts.routemisr.com/comments`, {
        content: data.content,
        post: data.post,
    }, {
        headers: { token: localStorage.getItem('userToken') }
    })
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.log(err);
        })
})

let postsSlice = createSlice({
    name: 'postsSlice',
    initialState: initialState,
    reducers: {
        setTimeForAddComment: (state) => {
            state.addedComment = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllPosts.fulfilled, (state: any, action: any) => {
            state.allPosts = action.payload.posts
            // console.log(action.payload.posts);
        })
        builder.addCase(createComment.fulfilled, (state: any, action: any) => {
            state.addedComment = true
        })
        builder.addCase(getUserPosts.fulfilled, (state: any, action: any) => {
            // console.log(action.payload.posts);
            state.userPosts = action.payload.posts
        })
        builder.addCase(createPosts.fulfilled, (state: any, action: any) => {
            console.log(action);
            state.isCreate = true
        })
    }
})

export let postsReducer = postsSlice.reducer
export let { setTimeForAddComment } = postsSlice.actions