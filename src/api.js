import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

apiClient.interceptors.request.use(
  async (config) => {
    
    const { useAuthStore } = await import('@/stores/authStore');
    const authStore = useAuthStore();

    if (authStore.isAuthenticated) {
      config.headers.Authorization = `Bearer ${authStore.token}`;
    }
    return config;
  },
  
  (error) => {
    return Promise.reject(error);
  }
);
export default apiClient;