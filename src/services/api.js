import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// Generic GET request
const getData = async (endpoint) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
};

// Fetch posts
export const getPosts = async () => {
  return getData('/posts');
};

// Fetch comments
export const getComments = async () => {
  return getData('/comments');
};

// Fetch todos
export const getTodos = async () => {
  return getData('/todos');
};

// Fetch photos
export const getPhotos = async () => {
  return getData('/photos');
};

// Fetch albums
export const getAlbums = async () => {
  return getData('/albums');
};

// Fetch users
export const getUsers = async () => {
  return getData('/users');
};

// Fetch a single user by ID
export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw error;
  }
};

// Login user (Mock API call for Reqres API)
export const login = async (credentials) => {
  try {
    const response = await axios.post('https://reqres.in/api/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Error during login:', error.response?.data || error.message);
    throw error;
  }
};

// Register user (Mock API call for Reqres API)
export const register = async (userDetails) => {
  try {
    const response = await axios.post('https://reqres.in/api/register', userDetails);
    return response.data;
  } catch (error) {
    console.error('Error during registration:', error.response?.data || error.message);
    throw error;
  }
};

const api = {
  getPosts,
  getComments,
  getTodos,
  getPhotos,
  getAlbums,
  getUsers,
  getUserById,
  login,
  register,
};
export default api;
