import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, Pagination, Select, MenuItem, FormControl, InputLabel, Stack, Avatar, IconButton, Grid, Tooltip, } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import type { EventDTO } from '../model/EventDTO';
import { getListEventsUserHostingOrAttend, getListUpcomingEvents } from '../services/event-service';
import dayjs from 'dayjs';
import { useUser } from '../common/UserContext';
import AssignmentIcon from '@mui/icons-material/Assignment';

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20, 0];

export default function UserProfilePage() {
    const { user } = useUser();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(5);
    const [paginatedEvents, setPaginatedEvents] = useState<EventDTO[]>([]);
    const [eventList, setEventList] = useState<EventDTO[]>([])

    useEffect(() => {
        const fetchUpcomingEvents = async () => {

            if (user?.id == null) {
                return
            }
            const response = await getListEventsUserHostingOrAttend(user?.id);
            if (response.status == 200) {
                setEventList(response.data);
            }
        }
        fetchUpcomingEvents();
    }, [])

    useEffect(() => {
        if (itemsPerPage === 0) {
            setPaginatedEvents(eventList);
            setCurrentPage(1);
        } else {
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            setPaginatedEvents(eventList.slice(startIndex, endIndex));
        }
    }, [currentPage, itemsPerPage, eventList]);

    const totalPages =
        itemsPerPage === 0 ? 1 : Math.ceil(eventList.length / itemsPerPage);

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
        const value = event.target.value;
        setItemsPerPage(typeof value === 'string' ? parseInt(value, 10) : value);
        setCurrentPage(1);
    };

    return (
        <>
            <Box maxWidth="lg" mx="auto" p={1} mt={7} sx={{ borderRadius: '10px', bgcolor: 'lightblue' }}>


                {paginatedEvents.length !== 0 && (
                    <>
                        <List>
                            {paginatedEvents.map((event, idx) => (
                                <React.Fragment key={event.id}>
                                    <ListItem alignItems="flex-start">
                                        <ListItemText
                                            primary={
                                                <>
                                                    <Box mt={1} >
                                                        <Grid container spacing={1}>
                                                            <Grid size={{ xs: 12, md: 6, lg: 6 }}>
                                                                <Box display="flex" alignItems="center">
                                                                    <Avatar aria-describedby="id" variant="rounded" sx={{ color: 'white', display: { xs: 'none', md: 'flex' }, marginRight: '5px', }} >
                                                                        <AssignmentIcon />
                                                                    </Avatar>
                                                                    <Typography variant="h6" color="primary" component="span">
                                                                        {event.title}
                                                                    </Typography>
                                                                </Box>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>

                                                    <Box mt={1} sx={{ alignItems: 'center' }}>

                                                        <Grid container spacing={1}>
                                                            <Grid size={12}>
                                                                <Typography variant="body1" color="info"> {event.description} </Typography>
                                                            </Grid>
                                                            <Grid size={{ xs: 12, md: 9, lg: 9 }}>
                                                                <Stack direction={{ xs: 'column', lg: 'row' }} spacing={{ xs: 0.5, lg: 0 }} useFlexGap >
                                                                    <Typography variant="caption" color="textSecondary">
                                                                        {`From: ${event.startTime ? dayjs(event.startTime).format("DD/MM/YYYY HH:mm") : ""}, `}
                                                                    </Typography>
                                                                    <Typography variant="caption" color="textSecondary">
                                                                        {`To: ${event.endTime ? dayjs(event.endTime).format("DD/MM/YYYY HH:mm") : ""}, `}
                                                                    </Typography>
                                                                    <Typography variant="caption" color="textSecondary">
                                                                        {`At: ${event.location || ""}`}
                                                                    </Typography>
                                                                </Stack>
                                                            </Grid>
                                                            <Grid size={{ xs: 12, md: 3, lg: 3 }} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, alignItems: 'center' }} >
                                                                <Typography variant="caption" color="textSecondary">
                                                                    {`Created on: ${event.createdAt ? dayjs(event.createdAt).format("DD/MM/YYYY HH:mm") : ""}`}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid size={12}>
                                                                <Stack direction={{ xs: 'column', lg: 'row' }} useFlexGap >
                                                                    <Typography variant="caption" color="info" component="span">  {`Going: ${event.goingCount} | `} </Typography>
                                                                    <Typography variant="caption" color="info" component="span">  {`Maybe: ${event.goingCount} | `} </Typography>
                                                                    <Typography variant="caption" color="info" component="span">  {`Declined: ${event.goingCount}`} </Typography>
                                                                </Stack>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </>

                                            }

                                        />

                                    </ListItem>
                                    {idx < paginatedEvents.length - 1 && <Divider component="li" />}
                                </React.Fragment>
                            ))}
                        </List>

                        {itemsPerPage !== 0 && (
                            <Box mt={4} display="flex" justifyContent="center">
                                <Pagination
                                    count={totalPages}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                    color="primary"
                                    size="small"
                                    shape="rounded"
                                    showFirstButton
                                    showLastButton
                                />
                                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" mb={2} spacing={2} >
                                    <FormControl size="small" sx={{ minWidth: 120 }}>
                                        <InputLabel id="items-per-page-label">Items per page</InputLabel>
                                        <Select size="small"
                                            labelId="items-per-page-label"
                                            value={itemsPerPage}
                                            label="Items per page"
                                            onChange={handleItemsPerPageChange}
                                            inputProps={{ 'aria-label': 'items per page' }}
                                            native={false}  >
                                            {ITEMS_PER_PAGE_OPTIONS.map((option) => (
                                                <MenuItem key={option} value={option}> {option === 0 ? 'All' : option}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Stack>
                            </Box>
                        )}
                    </>
                )}

                <Box justifyItems="center" pt={5} pb={5}>
                    {paginatedEvents.length === 0 && (
                        <Typography variant="caption" color="info" display="block"> No events available at the moment. Please check back later.</Typography>
                    )}
                </Box>
            </Box>

        </>

    );
};
