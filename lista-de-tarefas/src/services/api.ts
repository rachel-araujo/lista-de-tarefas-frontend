import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:5000/api',
})

export const fetchTasks = () => api.get('/tasks');
export const createTask = (title: string) => api.post('/tasks');
export const completeTask = (taskId: number) => api.put(`/tasks/${taskId}`);
export const deleteTask = (taskId: number) => api.delete(`/tasks/${taskId}`);