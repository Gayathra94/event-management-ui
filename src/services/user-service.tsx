import api from "../common/AxiosConfig";

const CONTROLLER_NAME = "/user";

export const getUserDetails = async () => {
    return await api.get(`${CONTROLLER_NAME}/getUserDetails`, {withCredentials: true });
};

