import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';
import authReducer from '../features/auth/authSlice'
import userReducer from '../features/user/userSlice'
import postsReducer from '../features/post/postsSlice'


export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        posts: postsReducer,
    },
    applyMiddleware: () => {
        setupLogRocketReact(LogRocket);
        LogRocket.init('2sxbui/test');
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    devTools: process.env.NODE_ENV !== 'production',
})
