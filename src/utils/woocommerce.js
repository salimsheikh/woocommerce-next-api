// utils/woocommerce.js
import axios from 'axios';

const consumerKey = process.env.NEXT_PUBLIC_WC_CONSUMER_KEY;
const consumerSecret = process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET;
const storeUrl = process.env.NEXT_PUBLIC_WC_STORE_URL;

console.log('Consumer Key:', consumerKey);
console.log('Consumer Secret:', consumerSecret);
console.log('Store URL:', storeUrl);

const api = axios.create({
  baseURL: `${storeUrl}/wp-json/wc/v3/`,
  auth: {
    username: consumerKey,
    password: consumerSecret,
  },
});

api.interceptors.response.use(
  response => response,
  error => {
    const customError = {
      message: error.message,
      name: error.name,
      code: error.code,
      config: error.config,
      request: error.request,
      response: error.response,
    };
    return Promise.reject(customError);
  }
);

export default api;
