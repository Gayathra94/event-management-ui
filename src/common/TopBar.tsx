import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/auth-service';
import ManageEventDialog from '../components/ManageEventDialog';
import { useState } from 'react';

function TopBar() {
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
          <Typography  variant="h6"  component={Link}  to="/dashboard"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              cursor: 'pointer',
              '&:hover': { color: 'inherit' },
            }} >  Event Manager </Typography>

          <Button color="inherit" onClick={() => setDialogOpen(true)}>Create Event</Button>
          <Button color="inherit" onClick={() => navigate("/user-profile")}>Profile</Button>
          <Button color="inherit" onClick={logoutHandler}>Logout</Button>
        </Toolbar>
      </AppBar>

      <ManageEventDialog  mode="C" open={dialogOpen}  onClose={() => setDialogOpen(false)}
      />
    </>
  );
}

export default TopBar;
