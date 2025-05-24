import { Dayjs } from "dayjs";

export interface User {

    id?: string;
    username: string;
    password: string;
    name: string| null;
    email: string;
    role: string;
    createdAt?:Dayjs;
    updatedAt?:Dayjs;

}