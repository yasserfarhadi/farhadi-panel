import axios from 'axios';
import type { User } from './Models/User';

const HTTPRequest = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchUsers = async () => {
  const response = await HTTPRequest.get<User[]>('/users');
  return response.data;
};
