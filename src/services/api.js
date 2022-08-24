import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-click-project.herokuapp.com',
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const auth = localStorage.getItem('USER');
  if (auth) {
    const { token } = JSON.parse(auth);
    const tmpConfig = config;
    if (token) {
      tmpConfig.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
