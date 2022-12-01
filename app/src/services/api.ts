import axios, { AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: 'https://192.168.1.5:3001',
});

export { api, AxiosResponse };
