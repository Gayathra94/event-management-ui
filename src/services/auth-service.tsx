import type { UserDTO } from '../model/UserDTO';
import api from '../common/AxiosConfig';

const CONTROLLER_NAME = "/auth";

export const createUser = async (user: UserDTO) => {
  return await api.post(`${CONTROLLER_NAME}/createUser`, user);
};

export const login = async ({ username, password }: { username: string; password: string }) => {
  return await api.post(`${CONTROLLER_NAME}/login`, { username, password}, { withCredentials: true});
}

export const logout = async () => {
  try {
    const response = await api.get(`${CONTROLLER_NAME}/logout`, { withCredentials: true,});
    return response;
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
};