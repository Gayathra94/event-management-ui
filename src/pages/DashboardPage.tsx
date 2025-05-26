import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, Pagination, Select, MenuItem, FormControl, InputLabel, Stack, Avatar, IconButton, Tooltip, Button, Grid, } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import type { EventDTO } from '../model/EventDTO';
import { deleteEvent, getListUpcomingEvents } from '../services/event-service';
import dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import ManageEventDialog from '../components/ManageEventDialog';
import AttendButtonGroup from '../components/AttendButtonGroup';
import EventFilterDialog from '../components/EventFilterDialog';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useGlobalAlert } from '../common/AlertProvider';
import type { AxiosError } from 'axios';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import { useUser } from '../common/UserContext';
import { color } from '@mui/system';


const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20, 0];

export default function DashboardPage() {

    const { user } = useUser();
    const { showAlert } = useGlobalAlert();
    const defaultValues: EventDTO = { id: "", title: "", description: "", hostId: "", startTime: null, endTime: null, location: "", visibility: "", createdAt: dayjs(), };
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(5);
    const [paginatedEvents, setPaginatedEvents] = useState<EventDTO[]>([]);
    const [eventList, setEventList] = useState<EventDTO[]>([])
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<EventDTO>(defaultValues);
    const [filterDialogOpen, setFilterDialogOpen] = useState(false);
    const [filters, setFilters] = React.useState({ title: '', startTime: null, endTime: null, });
    const [mode, setMode] = useState<string>("C");
    const [totalPages, setTotalPages] = useState(0);

    //load event data
    const fetchUpcomingEvents = async (page: number, size: number) => {
        try {
            const pageNo = page - 1;
            const eventListSize = size;
            console.log(pageNo, eventListSize);

            const response = await getListUpcomingEvents(pageNo, eventListSize);
            if (response.status === 200) {
                setEventList(response.data.eventDTOList);
                setTotalPages(itemsPerPage === 0 ? 1 : Math.ceil(response.data.totalRows / itemsPerPage))
            }
        } catch (error) {
            showAlert("Failed to load events.", "error");
        }
    };

    useEffect(() => {
        fetchUpcomingEvents(currentPage, itemsPerPage);
    }, [currentPage, itemsPerPage]);


    //pagination update
    useEffect(() => {
        if (itemsPerPage === 0) {
            setPaginatedEvents(eventList);
            setCurrentPage(1);
            console.log(eventList);
            
        } else {
            setPaginatedEvents(eventList);
              console.log(eventList);
        }
    }, [currentPage, itemsPerPage, eventList]);



    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
        const value = event.target.value;
        setItemsPerPage(typeof value === 'string' ? parseInt(value, 10) : value);
        setCurrentPage(1);
        console.log(totalPages, currentPage, itemsPerPage);
    };

    const handleCreate = () => {
        setSelectedEvent(defaultValues)
        setDialogOpen(true)
        setMode('C');
    }

    const handleEdit = (event: EventDTO) => {
        setSelectedEvent(event)
        setDialogOpen(true)
        setMode('E');
    }

    const handleRemove = async (id: string) => {
        try {
            const response = await deleteEvent(id);
            if (response.status == 200) {
                showAlert(`Event has been deleted successfully.`, "success");
                await fetchUpcomingEvents(currentPage, itemsPerPage);
            }
        } catch (err) {
            const error = err as AxiosError;
            const errorMessage = error.response?.data || 'Something went wrong.';
            showAlert(`${errorMessage}`, "error")
        }
    }

    const closeSearchDialog = () => {
        setFilterDialogOpen(false);
    };

    const applyFilters = (newFilters: any) => {
        setFilters(newFilters);
    };
    const resetFilters = () => {
        setFilters({ title: '', startTime: null, endTime: null, });
        fetchUpcomingEvents(1, 5)
    };
    return (
        <>
            <Box maxWidth="lg" mx="auto" mt={5} p={1} sx={{ borderRadius: '10px', bgcolor: 'lightblue' }}>
               
               
                        <Box display="flex" justifyContent="right" m={1} sx={{ borderRadius: '10px', bgcolor: '#b8bfc1' }}>

                            <Grid container spacing={1}>
                                <Grid size={{ xs: 12, md: 12, lg: 12 }}>
                                    <Tooltip title="Create Event" arrow>
                                        <IconButton color="success" size="large" onClick={() => handleCreate()} >
                                            <AddIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Apply Filters" arrow>
                                        <IconButton color="default" size="large" onClick={() => setFilterDialogOpen(true)} >
                                            <FilterListIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </Box>
                         {eventList.length !==0 && (     <>
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
                                                                    <Typography variant="h6" color='primary' component="span">  {event.title} </Typography>
                                                                </Box>
                                                            </Grid>
                                                            <Grid size={{ xs: 12, md: 6, lg: 6 }} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', lg: 'flex-end' }, alignItems: 'center', mt: { xs: 1, lg: 0 }, }}  >
                                                                <Stack direction="row" spacing={1}>
                                                                    <AttendButtonGroup eventId={event.id} onUpdate={fetchUpcomingEvents} />

                                                                    {(user?.role === 'ADMIN' || event.hostId === user?.id) && (

                                                                        <>
                                                                            <Tooltip title="Edit Event" arrow>
                                                                                <IconButton sx={{ margin: '0', padding: '0' }} color="warning" size="small" onClick={() => handleEdit(event)} >
                                                                                    <EditSquareIcon />
                                                                                </IconButton>
                                                                            </Tooltip>
                                                                            <Tooltip title="Delete Event" arrow>
                                                                                <IconButton sx={{ margin: '0', padding: '0' }} color="error" size="small" onClick={() => handleRemove(event.id)} >
                                                                                    <DeleteIcon />
                                                                                </IconButton>
                                                                            </Tooltip>
                                                                        </>
                                                                    )}

                                                                </Stack>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>

                                                    <Box mt={1} sx={{ alignItems: 'center' }}>

                                                        <Grid container spacing={0.1}>
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
  <Typography variant="caption" color="info" component="span">  {`Maybe: ${event.maybeCount} | `} </Typography>
  <Typography variant="caption" color="info" component="span">  {`Declined: ${event.declinedCount}`} </Typography>
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
                    {eventList.length ===0 && (
                        <Typography variant="caption" color="info" display="block"> No events available at the moment. Please check back later.</Typography>
                    )}
                </Box>


            </Box>

            <EventFilterDialog open={filterDialogOpen} onClose={closeSearchDialog} onApplyFilters={applyFilters} onRestFilters={resetFilters}></EventFilterDialog>
            <ManageEventDialog mode={mode} eventDTO={selectedEvent} open={dialogOpen} onClose={() => setDialogOpen(false)} fetchUpcomingEvents={fetchUpcomingEvents}></ManageEventDialog>

        </>

    );
};
