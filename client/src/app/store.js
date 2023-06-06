import { configureStore } from "@reduxjs/toolkit";

import authReducer from '../features/auth/authSlice'
import postsReducer from '../features/post/postsSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    devTools: process.env.NODE_ENV !== 'production',
})
