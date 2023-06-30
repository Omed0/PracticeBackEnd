import { useLocation, Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute({ allowedRole }) {

    const { pathname } = useLocation()
    const { userCredintial } = useSelector(state => state.auth)


    return (
        allowedRole.includes(userCredintial.isAdmin)
            ?
            <Outlet />
            : userCredintial && userCredintial.length > 0
                ? <Navigate to='/' state={{ from: pathname }} replace />
                : <Navigate to='/auth' state={{ from: pathname }} replace />
    )
}
