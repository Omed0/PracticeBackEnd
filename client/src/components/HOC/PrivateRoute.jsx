// import { Route, redirect as Redirect } from 'react-router-dom';

// const PrivateRoute = ({ component: Component, ...rest }) => {
//     return <Route {...rest} component={(props) => {
//         const { token } = JSON.parse(localStorage.getItem('userInfo'));
//         if (token) {
//             return <Component {...props} />
//         } else {
//             return <Redirect to={`/signin`} />
//         }
//     }} />
// }

// export default PrivateRoute;