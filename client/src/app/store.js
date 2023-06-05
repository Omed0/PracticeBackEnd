import { configureStore } from "@reduxjs/toolkit";

import authReducer from '../features/auth/authSlice'
import postsReducer from '../features/post/postsSlice'
import specificPostReducer from '../features/post/specificPostSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postsReducer,
        post: specificPostReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    devTools: process.env.NODE_ENV !== 'production',
})
