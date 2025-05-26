import { } from "@mui/material";
import { Box, Button, Container, FormControl, FormHelperText, Grid, MenuItem, Paper, Select, Stack, TextField, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import SaveIcon from '@mui/icons-material/Save';
import type { EventDTO } from "../model/EventDTO";
import { createEvent, updateEvent } from "../services/event-service";
import { useUser } from "../common/UserContext";
import { useGlobalAlert } from "../common/AlertProvider";
import type { AxiosError } from "axios";
import { useEffect, useMemo } from "react";
import SaveAsIcon from '@mui/icons-material/SaveAs';

export default function ManageEventDialog(props: { mode: string; eventDTO: EventDTO; open: boolean; onClose: () => void; fetchUpcomingEvents: (page: number, size: number) => void; }) {


    const { user } = useUser();
    const { showAlert } = useGlobalAlert();
    const visibilityList = [
        { label: 'PUBLIC', value: 'PUBLIC' },
        { label: 'PRIVATE', value: 'PRIVATE' }
    ];

    const eventDefaultValues = useMemo(() => ({
        ...props.eventDTO,
        startTime: props.eventDTO.startTime ? dayjs(props.eventDTO.startTime) : null,
        endTime: props.eventDTO.endTime ? dayjs(props.eventDTO.endTime) : null,
        createdAt: dayjs(props.eventDTO.createdAt),
        updatedAt: props.eventDTO.updatedAt ? dayjs(props.eventDTO.updatedAt) : undefined
    }), [props.eventDTO]);


    const { control, handleSubmit, formState: { errors }, setError, reset } = useForm<EventDTO>({ defaultValues: eventDefaultValues });

    useEffect(() => {
        reset(eventDefaultValues);
    }, [eventDefaultValues, reset]);


    const handleEventCreate = async (eventDTO: EventDTO) => {
        if (user == null) {
            showAlert(`Unable to create a event.`, "error")
            return;
        }
        eventDTO.hostId = user.id;
        try {
            const response = await createEvent(eventDTO);
            debugger
            if (response.status === 200) {
                showAlert(`Event has been created successfully.`, "success")
                props.fetchUpcomingEvents(1, 5);
                props.onClose();
            }

        } catch (err) {
            const error = err as AxiosError<{ code: string; message: string }>;
            debugger;
            if (error.status == 500) {
                if (error.response?.data?.code === '1001') {
                    const errorMessage = error.response?.data?.message || 'Something went wrong.';
                    showAlert(errorMessage, "error")
                }
            }
            if (error.status === 400) {
                const eventRequestErrors = error.response?.data;
                if (eventRequestErrors && typeof eventRequestErrors === 'object') {
                    Object.entries(eventRequestErrors).forEach(([field, message]) => {
                        setError(field as keyof EventDTO, {
                            type: 'manual',
                            message: message as string
                        });
                    });
                }
            }

        }
    };

    const handleEventUpdate = async (eventDTO: EventDTO) => {
        if (user == null) {
            showAlert(`Unable to update a event.`, "error")
            return;
        }
        eventDTO.hostId = user.id;
        try {
            const response = await updateEvent(eventDTO);
            if (response.status === 200) {
                showAlert(`Event has been updated successfully.`, "success")
                props.fetchUpcomingEvents(1, 5);
                props.onClose();
            }

        } catch (err) {
            const error = err as AxiosError<{ code: string; message: string }>;
            debugger;
            if (error.status == 500) {
                if (error.response?.data?.code === '1003') {
                    const errorMessage = error.response?.data?.message || 'Something went wrong.';
                    showAlert(errorMessage, "error")
                }
            }
            if (error.status === 400) {
                const eventRequestErrors = error.response?.data;
                if (eventRequestErrors && typeof eventRequestErrors === 'object') {
                    Object.entries(eventRequestErrors).forEach(([field, message]) => {
                        setError(field as keyof EventDTO, {
                            type: 'manual',
                            message: message as string
                        });
                    });
                }
            }
        }
    }

    return (

        <Dialog fullWidth maxWidth="lg" aria-labelledby="manage-role-title" open={props.open} onClose={props.onClose} >
            <DialogTitle sx={{ fontWeight: '600' }} id="manage-role-title">
                Event Creation
            </DialogTitle>

            <DialogContent>
                <Grid container spacing={3}>

                    <Grid size={{ xs: 12, md: 12, lg: 12 }}>

                        <Container sx={{ mt: 4 }}>

                            <Box sx={{ display: "flex", justifyContent: "center" }} >
                                <form onSubmit={handleSubmit(props.mode === "C" ? handleEventCreate : handleEventUpdate)} noValidate>
                                    <Grid container spacing={2}>
                                        <Grid size={{ xs: 12, md: 6, lg: 6 }}>

                                            <FormControl fullWidth error={!!errors.title} size="small" >
                                                <Controller name="title" defaultValue="" control={control} rules={{ required: "Title is required." }}
                                                    render={({ field }) => (
                                                        <TextField {...field} size="small" label="Title"
                                                            slotProps={{
                                                                input: { inputProps: { maxLength: 200 } }
                                                            }} />
                                                    )}
                                                />
                                                <FormHelperText>{errors.title?.message}</FormHelperText>
                                            </FormControl>
                                        </Grid>



                                        <Grid size={{ xs: 12, md: 6, lg: 6 }}>
                                            <FormControl fullWidth error={!!errors.startTime} size="small">
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>

                                                    <Controller name="startTime" control={control} defaultValue={null} rules={{ required: "Start time is required." }}
                                                        render={({ field }) => (
                                                            <DateTimePicker {...field} slotProps={{ textField: { fullWidth: true, variant: "outlined", size: "small", label: "Start time" } }}></DateTimePicker>
                                                        )}
                                                    />
                                                </LocalizationProvider>
                                                <FormHelperText>{errors.startTime?.message}</FormHelperText>
                                            </FormControl>
                                        </Grid>

                                        <Grid size={{ xs: 12, md: 6, lg: 6 }}>
                                            <FormControl fullWidth error={!!errors.endTime} size="small">
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>

                                                    <Controller name="endTime" control={control} defaultValue={null} rules={{ required: "End time is required." }}
                                                        render={({ field }) => (
                                                            <DateTimePicker  {...field} slotProps={{ textField: { fullWidth: true, variant: "outlined", size: "small", label: "End time" } }}></DateTimePicker >
                                                        )}
                                                    />
                                                </LocalizationProvider>
                                                <FormHelperText>{errors.endTime?.message}</FormHelperText>
                                            </FormControl>
                                        </Grid>

                                        <Grid size={{ xs: 12, md: 6, lg: 6 }}>
                                            <FormControl fullWidth size="small" error={!!errors.location}>
                                                <Controller name="location" defaultValue="" control={control} rules={{ required: "Location is required." }} render={({ field }) => (
                                                    <TextField label="Location" {...field} size="small"></TextField>
                                                )} />
                                                <FormHelperText>{errors.location?.message}</FormHelperText>
                                            </FormControl>
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 6, lg: 6 }}>
                                            <FormControl fullWidth size="small" error={!!errors.visibility}>
                                                <Controller name="visibility" control={control} rules={{ required: "Visibility type is required." }} render={({ field }) => (
                                                    <TextField  {...field} select label="Visibility type" fullWidth size="small" sx={{ textAlign: 'left' }}>
                                                        {visibilityList.map((option) => (
                                                            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                                        ))}
                                                    </TextField>
                                                )}
                                                />
                                                <FormHelperText>{errors.visibility?.message}</FormHelperText>
                                            </FormControl>
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 6, lg: 6 }}>
                                            <FormControl fullWidth size="small" error={!!errors.description}>
                                                <Controller name="description" defaultValue="" control={control} rules={{ required: "Description is required." }} render={({ field }) => (
                                                    <TextField label="Description" {...field} multiline rows={4} size="small"></TextField>
                                                )} />
                                                <FormHelperText>{errors.description?.message}</FormHelperText>
                                            </FormControl>
                                        </Grid>
                                        <Grid size={12} >
                                            <Box justifyContent="right" display="flex">
                                                <Button variant="outlined" size="small" sx={{ marginRight: '5px' }} onClick={props.onClose}>Close</Button>
                                                {props.mode == 'C' && (
                                                    <Button type="submit" size="small" variant="contained" startIcon={<SaveIcon />} > Save Event</Button>
                                                )}
                                                {props.mode == 'E' && (
                                                    <Button type="submit" size="small" variant="contained" startIcon={<SaveAsIcon />} > Update Event</Button>
                                                )}
                                            </Box>
                                        </Grid>
                                    </Grid>


                                </form>

                            </Box>
                        </Container>


                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>

    );
}

