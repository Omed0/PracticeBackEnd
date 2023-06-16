// import { useSeletor } from 'react-redux';
// import jwtDecode from 'jwt-decode';

// export default function useAuth() {
//     const { token } = useSeletor(state => state.auth.userCredintial);
//     let isAdmin = false;
//     let isUser = false;
//     let status = 'user'

//     if (token) {
//         const { isAdmin, username } = jwtDecode(token);
//         isAdmin = isAdmin.includes('admin')
//         isUser = isAdmin.includes('user')

//         if (isAdmin) status = 'admin';
//         else if (isUser) status = 'user';

//         return { username, isAdmin, status, isAdmin, isUser };
//     }
//     return { username: '', isAdmin, status, isAdmin, isUser };
// }