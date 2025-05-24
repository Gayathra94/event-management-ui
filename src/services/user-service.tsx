import axios from "axios"

const CONTROLLER = "http://localhost:8080/ems/user";

export const getUserDetails = async () => {
    return await axios.get(`${CONTROLLER}/getUserDetails`, {withCredentials: true });
};

