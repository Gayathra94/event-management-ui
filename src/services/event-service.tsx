import type { EventDTO } from "../model/EventDTO";
import type { AttendanceRequest } from "../model/AttendanceRequest";
import api from "../common/AxiosConfig";

const CONTROLLER_NAME = "events";

export const createEvent = async (eventDTO: EventDTO) => {
  return await api.post(`${CONTROLLER_NAME}/createEvent`, eventDTO,  { withCredentials: true});
};

export const getListUpcomingEvents = async (page: number, size: number) => {
  return await api.get(`${CONTROLLER_NAME}/getListUpcomingEvents`, {
    params: { page, size },
  });
};

export const updateEvent = async (updatedEventDTO: EventDTO) => {
  return await api.put(`${CONTROLLER_NAME}/updateEvent`, updatedEventDTO);
};

export const deleteEvent = async (eventId:string) => {
  return await api.delete(`${CONTROLLER_NAME}/deleteEvent/${eventId}`);
};

export const attendEvent = async (attendanceRequest: AttendanceRequest) => {
  return await api.post(`${CONTROLLER_NAME}/attendEvent`, attendanceRequest);
};

export const getListEventsUserHostingOrAttend = async (hostId:string) => {
  return await api.get(`${CONTROLLER_NAME}/getListEventsUserHostingOrAttend/${hostId}`);
};
