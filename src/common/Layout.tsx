import { Backdrop, Box, CircularProgress } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import TopBar from "./TopBar";
import React, { Suspense } from "react";


const Layout: React.FC = () => {


    const DashboardPage = React.lazy(() => import('../pages/DashboardPage'));
    const ProfilePage = React.lazy(() => import('../pages/UserProfilePage'))

    return (<>
        <Box>
            <TopBar />

            <Suspense fallback={
                <Backdrop
                    sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={true}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            }>
                <Routes>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/user-profile" element={<ProfilePage />} />
                </Routes>
            </Suspense>

        </Box>
    </>);
}

export default Layout;