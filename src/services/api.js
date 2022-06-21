import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
  },
});

export default api;
