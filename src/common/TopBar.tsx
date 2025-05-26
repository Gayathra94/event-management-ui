import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth-service';
import { useState } from 'react';
import { Avatar, Box, Divider, IconButton, MenuItem, Popover, Tooltip, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useUser } from './UserContext';
import { ExpandLess, ExpandMore, Key, LocalActivity } from "@mui/icons-material";
import PersonIcon from '@mui/icons-material/Person';


function TopBar() {

  const { user } = useUser();
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const openUser = Boolean(anchorEl);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const response = await logout();
      if (response.status === 200) {
        setAnchorEl(null)
        localStorage.removeItem('user');
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="body1"
            component="h1"
            onClick={() => navigate('/dashboard')}
            sx={{
              color: 'white',
              display: 'flex',
              marginRight: '5px',
              cursor: 'pointer',
              fontSize: '18px',
              '&:hover': { color: 'inherit' }
            }}
          >
            Event Manager
          </Typography>


          <Box sx={{ flexGrow: 1 }} />


          <Avatar
            alt="Remy Sharp"
            title={user?.name?.toUpperCase() ?? 'N/A'}
            src="https://i.imgur.com/1bX5QH6.jpg"
            aria-describedby={"id"}
            sx={{
              color: 'white',
              display: 'flex', // <== Always show avatar
              cursor: 'pointer',
            }}
            onClick={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              setAnchorEl({ top: rect.bottom, left: rect.right });
            }}
          />

          <Popover id={"id"} open={openUser} anchorPosition={anchorEl} onClose={handleClose} anchorReference="anchorPosition"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            disableScrollLock={true} >
            <Box p={1}>
              <Box width={1} textAlign={'center'} m={1} fontSize={16}>  {user?.name?.toUpperCase() ?? 'N/A'} </Box>

              <Divider />

              <MenuItem onClick={() => { navigate("/user-profile") }}>
                <Box width={1} mt={1} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                  <PersonIcon sx={{ mr: 1 }} /> Profile
                </Box>
              </MenuItem>
              <Divider />
              <MenuItem onClick={logoutHandler}>
                <Box width={1} mt={1} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                  <LogoutIcon sx={{ mr: 1 }} /> Logout
                </Box>
              </MenuItem>
            </Box>
          </Popover>
        </Toolbar>
      </AppBar>


    </>
  );
}

export default TopBar;
