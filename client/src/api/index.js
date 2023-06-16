import { API } from './customAxios';

//===================== POSTS =====================//
export const createBlog = (newPost) => API.post('/blog', newPost);
export const fetchBlogs = () => API.get('/blog');
export const specificBlog = (id) => API.get(`/blog/${id}`);
export const updateBlog = (id, updatedPost) => API.patch(`/blog/${id}`, updatedPost);
export const deleteBlog = (id) => API.delete(`/blog/${id}`);


//===================== AUTH =====================//
export const signUp = (formData) => API.post('/auth/signup', formData);
export const signIn = (formData) => API.post('/auth/signin', formData);


//===================== USERS =====================//
export const fetchUsers = () => API.get('/user');
export const fetchUser = (id) => API.get(`/user/${id}`);
export const updateUser = (id, updatedUser) => API.patch(`/user/${id}`, updatedUser);
export const deleteUser = (id) => API.delete(`/user/${id}`);