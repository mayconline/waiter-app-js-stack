import axios from 'axios';
import { API_URL } from '../utils/variables';

const api = axios.create({
  baseURL: API_URL,
});

export { api };
