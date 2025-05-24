import type { Dayjs } from "dayjs";

export interface EventRequest {
    id: string;
    title: string;
    description: string;
    hostId: string;
    startTime: Dayjs | null;
    endTime: Dayjs | null;
    location: string;
    visibility: string;
    createdAt: Dayjs;
    updatedAt?: Dayjs;
    startTimeStr?: string;
    endTimeStr?: string;
    createdAtSt?: string;
    updatedAtStr?: string;
}