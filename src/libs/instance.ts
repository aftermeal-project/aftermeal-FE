import axios from 'axios';
import { BASE_URL } from '../constants/url';
import { errorHandler } from './utils/error.handler';

export const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.response.use(
  response => response,
  error => {
    errorHandler(error);
    return Promise.reject(error);
  },
);
