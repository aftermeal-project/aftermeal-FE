import axios from 'axios';
import { BASE_URL } from '../constants/url';

export const instance = axios.create({
  baseURL: BASE_URL,
});
