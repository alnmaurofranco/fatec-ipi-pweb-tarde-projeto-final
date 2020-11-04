import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333/api/v1",
});

// api.interceptors.request.use(async config => {
//   const token = getToken();
//   if (token) return config.headers.Authorization = `Bearer ${token}`;
// });

export default api;