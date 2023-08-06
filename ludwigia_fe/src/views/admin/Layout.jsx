import { useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';

import { AdminContent, SidebarHeader } from './common.mui';
import AdministratorHeader from './Header';
import AdministratorSidebar from './Sidebar';

function AdminLayout() {
    const isLogin = useSelector((state) => state.adminAuth.login?.data);
    const [fullSidebar, setFullSiderbar] = useState(true);

    const location = useLocation();

    return isLogin ? (
        <Box display="flex">
            <AdministratorHeader
                fullSidebar={fullSidebar}
                onFullSidebar={() => setFullSiderbar((prev) => !prev)}
            />
            <AdministratorSidebar fullSidebar={fullSidebar} />
            <AdminContent>
                <SidebarHeader />
                <Box component="main" p={2}>
                    <Outlet />
                </Box>
            </AdminContent>
        </Box>
    ) : (
        <Navigate to="/administrator/login" state={{ from: location }} replace />
    );
}

export default AdminLayout;
