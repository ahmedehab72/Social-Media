import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let headers: any = { token: localStorage.getItem('userToken') };
let initialState: any = { allComments: [], isUpdateComment: false, isDeleteComment: false };

export let deleteComment = createAsyncThunk('postsSlice/deleteComment', async (commentId) => {
    console.log(commentId);
    let response = await fetch(`https://linked-posts.routemisr.com/comments/${commentId}`, {
        method: 'DELETE',
        headers: headers,
    })
    let data = await response.json();
    console.log(data);
    return data;
})

export let updateComment = createAsyncThunk('postsSlice/updateComment', async ({ updatevalue, content }) => {
    console.log({ updatevalue, content });

    axios.put(`https://linked-posts.routemisr.com/comments/${updatevalue}`, {
        content: content
    }, {
        headers: headers
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

let comments = createSlice({
    name: 'comments',
    initialState, initialState,
    reducers: {
        setTimeForUpdate: (state) => {
            state.isUpdateComment = false
        },
        setTimeForDelete: (state) => {
            state.isDeleteComment = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(deleteComment.fulfilled, (state, action) => {
            console.log(action.payload);
            state.isDeleteComment = true
        })
        builder.addCase(updateComment.fulfilled, (state, action) => {
            console.log(action);
            state.isUpdateComment = true
        })
    }
})
export let commentsReducer = comments.reducer;
export let { setTimeForUpdate, setTimeForDelete } = comments.actions;