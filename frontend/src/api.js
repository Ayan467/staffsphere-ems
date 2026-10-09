import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
});

export const getEmployees = (search = '') =>
  api.get('/employees', { params: search ? { search } : {} }).then((r) => r.data);

export const createEmployee = (data) => api.post('/employees', data).then((r) => r.data);

export const updateEmployee = (id, data) => api.put(`/employees/${id}`, data).then((r) => r.data);

export const deleteEmployee = (id) => api.delete(`/employees/${id}`);
