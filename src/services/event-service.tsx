import axios from "axios"
import type { EventDTO } from "../model/EventDTO";
import type { AttendanceRequest } from "../model/AttendanceRequest";

const CONTROLLER = "http://localhost:8080/ems/events";

export const createEvent = async (eventDTO: EventDTO) => {
  return await axios.post(`${CONTROLLER}/createEvent`, eventDTO,  { withCredentials: true});
};

export const getListUpcomingEvents = async (page: number, size: number) => {
  return await axios.get(`${CONTROLLER}/getListUpcomingEvents`, {
    params: { page, size },
    withCredentials: true,
  });
};



export const updateEvent = async (updatedEventDTO: EventDTO) => {
  return await axios.put(`${CONTROLLER}/updateEvent`, updatedEventDTO,  { withCredentials: true});
};

export const deleteEvent = async (eventId:string) => {
  return await axios.delete(`${CONTROLLER}/deleteEvent/${eventId}`,  { withCredentials: true});
};


export const attendEvent = async (attendanceRequest: AttendanceRequest) => {
  return await axios.post(`${CONTROLLER}/attendEvent`, attendanceRequest,  { withCredentials: true});
};

export const getListEventsUserHostingOrAttend = async (hostId:string) => {
  return await axios.get(`${CONTROLLER}/getListEventsUserHostingOrAttend/${hostId}`,{ withCredentials: true});
};
