import axios from 'axios';
import type { User } from '../model/User';

const CONTROLLER = "http://localhost:8080/ems/auth";

export const createUser = async (user: User) => {
  return await axios.post( `${CONTROLLER}/createUser`, user);
};

export const test = async () =>{
    return await axios.get(`${CONTROLLER}/testAuth`);
}