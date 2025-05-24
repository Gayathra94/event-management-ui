import axios from "axios"
import type { EventRequest } from "../model/EventRequest";

const CONTROLLER = "http://localhost:8080/ems/events";

export const createEvent = async (eventRequest: EventRequest) => {
  return await axios.post(`${CONTROLLER}/createEvent`, eventRequest,  { withCredentials: true});
};

export const getListUpcomingEvents = async () => {
  return await axios.get(`${CONTROLLER}/getListUpcomingEvents`,{ withCredentials: true});
};