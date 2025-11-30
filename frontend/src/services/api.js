import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8084/api/v1';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth APIs
export const signup = (userData) => api.post('/user/signup', userData);
export const login = (credentials) => api.post('/user/login', credentials);

// Employee APIs
export const getAllEmployees = (params) => api.get('/emp/employees', { params });
export const getEmployeeById = (id) => api.get(`/emp/employees/${id}`);
export const createEmployee = (formData) => api.post('/emp/employees', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateEmployee = (id, formData) => api.put(`/emp/employees/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const deleteEmployee = (id) => api.delete(`/emp/employees?eid=${id}`);
export const searchEmployees = (department, position) =>
    api.get('/emp/employees', { params: { department, position } });

export default api;
