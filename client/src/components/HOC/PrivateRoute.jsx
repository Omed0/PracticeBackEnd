// page PrivateRoute.jsx

import React from 'react';
import { Route, Navigate } from 'react-router-dom';

export default function AuthorizedRoute({ component: Component, requiredRoles, redirect, ...rest }) {
    const { token } = JSON.parse(localStorage.getItem('userInfo'));
    const isAuthorized = token && requiredRoles.includes(token.role);

    return (
        <Route
            {...rest}
            element={isAuthorized ? <Component /> : <Navigate to={redirect} replace />}
        />
    );
}