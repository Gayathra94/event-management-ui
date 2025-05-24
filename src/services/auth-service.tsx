import axios from 'axios';
import type { User } from '../model/User';

const CONTROLLER = "http://localhost:8080/ems/auth";

export const createUser = async (user: User) => {
  return await axios.post(`${CONTROLLER}/createUser`, user);
};

export const login = async ({ username, password }: { username: string; password: string }) => {
  return await axios.post(`${CONTROLLER}/login`, { username, password}, { withCredentials: true});
}

export const logout = async () => {
  try {
    const response = await axios.get(`${CONTROLLER}/logout`, { withCredentials: true,});
    return response;
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
};