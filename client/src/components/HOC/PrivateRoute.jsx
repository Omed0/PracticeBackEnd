import { useLocation, Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


export default function PrivateRoute({ allowedRole }) {

    const { pathname } = useLocation()
    const { userCredintial } = useSelector(state => state.auth)
    console.log(userCredintial.find((role) => allowedRole.includes(role)));

    return (
        userCredintial.find((role) => allowedRole.includes(role))
            ? <Outlet />
            : userCredintial
                ? <Navigate to='/Home' state={{ from: pathname }} replace />
                : <Navigate to='/auth' state={{ from: pathname }} replace />
    )
}
