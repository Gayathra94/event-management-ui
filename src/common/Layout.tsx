import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import TopBar from "./TopBar";
import DashboardPage from "../pages/DashboardPage";
import UserProfilePage from "../pages/UserProfilePage";


const Layout: React.FC = () => {
    return (<>
        <Box>
            <TopBar />
            <Routes>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/user-profile" element={<UserProfilePage />} />
            </Routes>
        </Box>
    </>);
}

export default Layout;