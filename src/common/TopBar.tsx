import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/auth-service';
import ManageEventDialog from '../components/ManageEventDialog';
import { useState } from 'react';
import type { EventDTO } from '../model/EventDTO';
import dayjs from 'dayjs';
import { Avatar, Box, IconButton, Tooltip } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

function TopBar() {

  const defaultValues: EventDTO = {
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


  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const logoutHandler = async () => {
    try {
      const response = await logout();
      if (response.status === 200) {
        localStorage.removeItem('user');
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>

          <Avatar alt="event logo" aria-describedby={"id"} component={Link} to="/dashboard"
            sx={{
              color: 'white', display: { xs: 'none', md: 'flex' }, marginRight: '5px', cursor: 'pointer',
              '&:hover': { color: 'inherit' }
            }} />

          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" onClick={() => setDialogOpen(true)}>Create Event</Button>
          <Button color="inherit" onClick={() => navigate("/user-profile")}>Profile</Button>

          <Tooltip title="Attendance">
            <IconButton onClick={logoutHandler} color='default'>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <ManageEventDialog mode="C" eventDTO={defaultValues} open={dialogOpen} onClose={() => setDialogOpen(false)}
      />
    </>
  );
}

export default TopBar;
