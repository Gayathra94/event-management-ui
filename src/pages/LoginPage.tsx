import { Button, Container, Typography } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from "react-router-dom";
export default function LoginPage() {

    const navigate = useNavigate();
    const handleLogin = () => {
        // Simulate login and navigate to dashboard
        navigate("/dashboard");
    };
    return (
        <>
            <Container maxWidth="sm" sx={{ mt: 10 }}>
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>
                <Button variant="contained" color="primary" startIcon={<LoginIcon />} onClick={handleLogin}>Login </Button>
            </Container>
        </>
    );
}