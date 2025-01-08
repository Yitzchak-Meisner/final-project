import axios from 'axios';

export const setupTokenInterceptor = () => {
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        // הטוקן פג תוקף
        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');
        window.dispatchEvent(new Event('authStateChange'));
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
};