import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./posts";
import { commentsReducer } from "./comments";
import { userReducer } from "./user";

export let store = configureStore({
    reducer: {
        posts: postsReducer,
        comments: commentsReducer,
        users: userReducer,
    }
})