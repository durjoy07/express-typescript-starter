import axios from 'axios';
const MAX_REQUESTS_COUNT = 5;
const INTERVAL_MS = 20;
let PENDING_REQUESTS = 0;
// create new axios instance
const axiosInstance = axios.create();
/**
 * Axios Request Interceptor
 */
axiosInstance.interceptors.request.use(function (config) {
  return new Promise(resolve => {
    const interval = setInterval(() => {
      if (PENDING_REQUESTS < MAX_REQUESTS_COUNT) {
        PENDING_REQUESTS++;
        clearInterval(interval);
        resolve(config);
      }
    }, INTERVAL_MS);
  });
});
/**
 * Axios Response Interceptor
 */
axiosInstance.interceptors.response.use(
  function (response) {
    PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1);
    return Promise.resolve(response);
  },
  function (error) {
    PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1);
    return Promise.reject(error);
  },
);
export default axiosInstance;
