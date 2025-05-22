
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';

function TopBar() {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/dashboard"
          sx={{
            flexGrow: 1, textDecoration: 'none', color: 'inherit', cursor: 'pointer', '&:hover': {
              color: 'inherit',
            },
          }}
        >
          Event Manager
        </Typography>
        <Button color="inherit" onClick={() => navigate("/dashboard")}>Dashboard</Button>
        <Button color="inherit" onClick={() => navigate("/eventDetail")}>Event Details</Button>
        <Button color="inherit" onClick={() => navigate("/userProfile")}>User Profile</Button>
      </Toolbar>
    </AppBar>
  );
}
export default TopBar;
