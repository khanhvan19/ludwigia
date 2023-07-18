import { useState } from 'react';
import { Link, NavLink, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import MenuItem from '@mui/material/MenuItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Menu as MenuContainer } from '@mui/material';

import AccountTreeOutlined from '@mui/icons-material/AccountTreeOutlined';
import Menu from '@mui/icons-material/Menu';
import MenuOpen from '@mui/icons-material/MenuOpen';
import SpeedOutlined from '@mui/icons-material/SpeedOutlined';
import YardOutlined from '@mui/icons-material/YardOutlined';
import Logout from '@mui/icons-material/Logout';

import { AdminContent, AdminHeader, AdminSidebar, HeaderButton, SidebarHeader } from './common.mui';
import { handleAdminLogout } from '~/redux/slices/adminAuth.slice';
import { toast } from 'react-toastify';
import { TOAST_STYLE } from '~/components/ui/customToastify';
import { teal } from '@mui/material/colors';

function AdminLayout() {
    const isLogin = useSelector((state) => state.adminAuth.login?.data);
    const [fullSidebar, setFullSiderbar] = useState(true);
    const [openMenu, setOpenMenu] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const sidebarContent = [
        { title: 'Tổng quan', icon: <SpeedOutlined />, link: '/admin/' },
        { title: 'Chi thực vật', icon: <AccountTreeOutlined />, link: '/admin/genus' },
        { title: 'Loài thực vật', icon: <YardOutlined />, link: '/admin/species' }
    ];

    const handleLogout = () => {
        dispatch(handleAdminLogout())
            .unwrap()
            .then((res) => {
                toast.success(res.message, TOAST_STYLE);
                navigate('/admin/login', { replace: true });
            });
    };

    return isLogin ? (
        <Box display="flex">
            <AdminHeader position="fixed" open={fullSidebar}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box display="flex" alignItems="center">
                        <HeaderButton
                            variant="contained"
                            disableElevation
                            onClick={() => setFullSiderbar((prev) => !prev)}
                        >
                            {fullSidebar ? <MenuOpen /> : <Menu />}
                        </HeaderButton>
                        <Box ml={2} display={fullSidebar ? 'none' : 'block'}>
                            <Typography
                                variant='h4' lineHeight={1}
                                color='text.accent2'
                                fontFamily='var(--signika-font)'
                                fontWeight={900} fontStyle='italic'
                            >
                                LUDWIGIA
                            </Typography>
                        </Box>
                    </Box>
                    <Box>
                        <HeaderButton
                            variant="contained"
                            disableElevation
                            onClick={(e) => setOpenMenu(e.currentTarget)}
                            aria-haspopup="true"
                            aria-controls={openMenu ? 'account-menu' : undefined}
                            aria-expanded={openMenu ? 'true' : undefined}
                        >
                            <Avatar
                                src={isLogin?.avatar?.link || '/'}
                                alt={isLogin.name}
                                sx={{ mr: 1.5, width: 36, height: 36, bgcolor: 'text.accent2' }}
                            />
                            {isLogin.name}
                        </HeaderButton>
                        <MenuContainer
                            anchorEl={openMenu}
                            id="account-menu"
                            open={Boolean(openMenu)}
                            onClose={() => setOpenMenu(null)}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            MenuListProps={{ disablePadding: true }}
                        >
                            <Box
                                minWidth={280}
                                py={1.5}
                                className="flex-center"
                                flexDirection="column"
                                bgcolor="text.active1"
                                color="background.paper"
                                border="2px solid #fff"
                                sx={{ borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
                            >
                                <Avatar
                                    src={isLogin?.avatar?.link || '/'} alt={isLogin.name}
                                    sx={{
                                        mr: 1.5, width: 80, height: 80,
                                        bgcolor: 'text.accent2', fontSize: '3rem',
                                        border: '4px solid', borderColor: teal[300]
                                    }}
                                />
                                <Typography mt={1} fontWeight={600}>
                                    {isLogin.name}
                                </Typography>
                                <Typography variant="body2" fontStyle="italic">
                                    {isLogin.email}
                                </Typography>
                            </Box>
                            <MenuItem sx={{ py: 1.25 }} onClick={handleLogout}>
                                <ListItemIcon>
                                    <Logout fontSize="small" sx={{ color: 'text.primary' }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary='Đăng xuất'
                                    primaryTypographyProps={{ fontWeight: 500 }}
                                />
                            </MenuItem>
                        </MenuContainer>
                    </Box>
                </Toolbar>
            </AdminHeader>
            <AdminSidebar
                variant="permanent" open={fullSidebar}
                PaperProps={{ sx: { bgcolor: 'background.dark', color: 'common.white' } }}
            >
                <SidebarHeader bgcolor="text.darkActive1">
                    <Typography
                        variant='h4' lineHeight={1}
                        color='text.accent2' align='center'
                        fontFamily='var(--signika-font)'
                        fontWeight={900} fontStyle='italic'
                    >
                        LUDWIGIA
                    </Typography>
                </SidebarHeader>
                <List>
                    {sidebarContent.map((item, idx) => (
                        <Tooltip
                            key={idx} arrow
                            title={item.title} placement="right"
                            disableHoverListener={fullSidebar ? true : false}
                            disableInteractive
                        >
                            <ListItemButton component={NavLink} to={item.link}
                                sx={{
                                    color: 'text.sidebar',
                                    '&.active': {
                                        bgcolor: 'background.activeDark',
                                        color: '#FFF',
                                        '& .MuiListItemIcon-root': { color: '#FFF' }
                                    }
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 40, color: 'text.sidebar' }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.title} sx={{ opacity: fullSidebar ? 1 : 0 }} />
                            </ListItemButton>
                        </Tooltip>
                    ))}
                </List>
            </AdminSidebar>
            <AdminContent>
                <SidebarHeader />
                <Box component="main" p={2}>
                    <Outlet />
                </Box>
            </AdminContent>
        </Box>
    ) : (
        <Navigate to="/admin/login" state={{ from: location }} replace />
    );
}

export default AdminLayout;
