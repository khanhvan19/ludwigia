import { NavLink } from 'react-router-dom';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';


import AccountTreeOutlined from '@mui/icons-material/AccountTreeOutlined';
import SpeedOutlined from '@mui/icons-material/SpeedOutlined';
import YardOutlined from '@mui/icons-material/YardOutlined';
import AdminPanelSettingsOutlined from '@mui/icons-material/AdminPanelSettingsOutlined';

import { AdminSidebar, SidebarHeader } from './common.mui';

const sidebarContent = [
    { title: 'Tổng quan', icon: <SpeedOutlined />, link: '/administrator/' },
    { title: 'Quản trị viên', icon: <AdminPanelSettingsOutlined />, link: '/administrator/user' },
    { title: 'Chi thực vật', icon: <AccountTreeOutlined />, link: '/administrator/genus' },
    { title: 'Loài thực vật', icon: <YardOutlined />, link: '/administrator/species' }
];

function AdministratorSidebar({ fullSidebar }) {
    return (
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
    );
}

export default AdministratorSidebar;