import { Container, Typography } from "@mui/material";
import { useUser } from "../common/UserContext";

export default function DashboardPage() {
    const { user } = useUser();

    return (<>
        <Container sx={{ mt: 4 }}>
            <Typography variant="h5">Welcome to the Dashboard, {user?.name}</Typography>
        </Container>
    </>);
}