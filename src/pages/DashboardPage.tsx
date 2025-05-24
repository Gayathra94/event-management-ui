import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, Pagination, Select, MenuItem, FormControl, InputLabel, Stack, Avatar, IconButton, Tooltip, Button, } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import type { EventRequest } from '../model/EventRequest';
import { getListUpcomingEvents } from '../services/event-service';
import dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import ManageEventDialog from '../components/ManageEventDialog';
import AttendButtonGroup from '../components/AttendButtonGroup';
import EventFilterDialog from '../components/EventFilterDialog';
import AssignmentIcon from '@mui/icons-material/Assignment';


const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20, 0];

export default function DashboardPage() {

    const defaultValues: EventRequest = {
        id: "",
        title: "",
        description: "",
        hostId: "",
        startTime: null,
        endTime: null,
        location: "",
        visibility: "",
        createdAt: dayjs(),
    };

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(5);
    const [paginatedEvents, setPaginatedEvents] = useState<EventRequest[]>([]);
    const [eventList, setEventList] = useState<EventRequest[]>([])
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<EventRequest>(defaultValues);
    const [filterDialogOpen, setFilterDialogOpen] = useState(false);
    const [filters, setFilters] = React.useState({
        hostName: '',
        startTime: null,
        endTime: null,
    });
    useEffect(() => {
        const fetchUpcomingEvents = async () => {
            const response = await getListUpcomingEvents();
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

    const handleEdit = (event: EventRequest) => {

        setSelectedEvent(event)
        setDialogOpen(true)
    }

    const handleRemove = (id: string) => {

    }

    const closeSearchDialog = () => {
        setFilterDialogOpen(false);
    };

    const applyFilters = (newFilters: any) => {
        setFilters(newFilters);
        //fetchInvoices(newFilters);
    };
    const resetFilters = (newFilters: any) => {
        setFilters(newFilters);
        //fetchInvoices();
    };
    return (
        <>
            <Box maxWidth="md" mx="auto" p={3}>
                <Box>
                    <Typography variant="h4" component="h1" sx={{ padding: 'none', margin: 'none' }} > Event List </Typography>
                    <Button onClick={() => { setFilterDialogOpen(true) }}>Apply Filters</Button>
                </Box>


                <List>
                    {paginatedEvents.map((event, idx) => (
                        <React.Fragment key={event.id}>
                            <ListItem alignItems="flex-start">
                                <ListItemText
                                    primary={
                                        <>
                                            <Box mt={1} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Box display='flex'>
                                                    <Avatar aria-describedby={"id"} variant="rounded"
                                                        sx={{ color: 'white', display: { xs: 'none', md: 'flex' }, marginRight: '5px' }} >
                                                        <AssignmentIcon />
                                                    </Avatar>
                                                    <Typography variant="h6" color='primary' component="span"> {event.title}  </Typography>
                                                </Box>

                                                <Stack direction="row" spacing={1} mt={1}>
                                                    <Tooltip title="Edit Event" arrow>
                                                        <IconButton color='warning' size='small' aria-label="delete" onClick={() => handleEdit(event)}><EditSquareIcon /></IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Delete Event" arrow>
                                                        <IconButton color='error' size='small' aria-label="delete" onClick={() => handleRemove(event.id)}><DeleteIcon /></IconButton>
                                                    </Tooltip>


                                                    <AttendButtonGroup></AttendButtonGroup>
                                                </Stack>


                                            </Box>
                                            <Box mt={1} sx={{ alignItems: 'center' }}>
                                                <Typography variant="body1" color='info' > {event.description}  </Typography>

                                                <Box mt={1} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <Box>
                                                        <Typography variant="caption" color="info">
                                                            From: {event.startTime ? dayjs(event.startTime).format("DD/MM/YYYY HH:mm") : ""}
                                                        </Typography>
                                                        <Typography variant="caption" color="info">
                                                            To: {event.startTime ? dayjs(event.startTime).format("DD/MM/YYYY HH:mm") : ""}
                                                        </Typography>
                                                    </Box>

                                                    <Box>
                                                        <Typography variant="caption" color="info" display="block">
                                                            Created on: {event.createdAt ? dayjs(event.createdAt).format("DD/MM/YYYY HH:mm") : ""}
                                                        </Typography>


                                                    </Box>
                                                </Box>

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
            </Box>
            <EventFilterDialog open={filterDialogOpen} onClose={closeSearchDialog} onApplyFilters={applyFilters} onRestFilters={resetFilters}></EventFilterDialog>
            <ManageEventDialog mode='E' eventRequest={selectedEvent} open={dialogOpen} onClose={() => setDialogOpen(false)}></ManageEventDialog>
        </>

    );
};
