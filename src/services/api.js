import axios from 'axios';

// Base URLs for the APIs
const API_URL_REQRES = 'https://reqres.in/api';
const API_URL_JSONPLACEHOLDER = 'https://jsonplaceholder.typicode.com';

// Fetch all users
export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL_REQRES}/users?per_page=12`);
    return response.data.data; // Returns the array of users
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Fetch a single user by ID
export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL_REQRES}/users/${id}`);
    return response.data.data; // Returns the user object
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw error;
  }
};

// Fetch all posts
export const getPosts = async () => {
  try {
    const response = await axios.get(`${API_URL_JSONPLACEHOLDER}/posts`);
    return response.data; // Returns the array of posts
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

// Fetch all comments
export const getComments = async () => {
  try {
    const response = await axios.get(`${API_URL_JSONPLACEHOLDER}/comments`);
    return response.data; // Returns the array of comments
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

// Fetch all todos
export const getTodos = async () => {
  try {
    const response = await axios.get(`${API_URL_JSONPLACEHOLDER}/todos`);
    return response.data; // Returns the array of todos
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

// Fetch all albums
export const getAlbums = async () => {
  try {
    const response = await axios.get(`${API_URL_JSONPLACEHOLDER}/albums`);
    return response.data; // Returns the array of albums
  } catch (error) {
    console.error('Error fetching albums:', error);
    throw error;
  }
};

// Fetch all photos
export const getPhotos = async () => {
  try {
    const response = await axios.get(`${API_URL_JSONPLACEHOLDER}/photos`);
    return response.data; // Returns the array of photos
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
};

// Utility function for login
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL_REQRES}/login`, {
      email,
      password,
    });
    return response.data; // Returns token or success response
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

// Utility function for register
export const register = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL_REQRES}/register`, {
      email,
      password,
    });
    return response.data; // Returns token or success response
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};

// Export all functions as a default object
const api = {
  getUsers,
  getUserById,
  getPosts,
  getComments,
  getTodos,
  getAlbums,
  getPhotos,
  login,
  register,
};

export default api;
