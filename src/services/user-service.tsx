import axios from "axios"

const CONTROLLER = "http://localhost:8080/ems/auth";

export const getUser = async () => {
    return await axios.get(`${CONTROLLER}/getUser`, {withCredentials: true });

};
export const logout = async () => {
    const response = await axios.get(`${CONTROLLER}/logout`);
    return response.data;
};