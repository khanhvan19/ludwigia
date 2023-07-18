import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListSubheader from '@mui/material/ListSubheader';
import AccountTreeOutlined from '@mui/icons-material/AccountTreeOutlined'
import LocalFloristOutlined from '@mui/icons-material/LocalFloristOutlined'
import Search from '@mui/icons-material/Search';
import { Marker } from 'react-mark.js';

import useDebounce from '~/hooks/useDebounce';
import axiosPublic from '~/utils/axiosPublic';
import { HomePageSearchInput } from '~/components/themeMUI/customComponents';

import styles from './homePage.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function SearchBar() {
    const [value, setValue] = useState('');
    const [searchGenus, setSearchGenus] = useState([]);
    const [searchSpecies, setSearchSpecies] = useState([]);
    var searchValue = useDebounce(value, 500)

    useEffect(() => {
        if (!searchValue.trim()) {
            setSearchGenus([]);
            setSearchSpecies([]);
            return;
        }
        axiosPublic
            .get('/genus/search', { params: { q: searchValue } })
            .then((res) => setSearchGenus(res))
            .catch((err) => console.log(err));
        axiosPublic
            .get('/genus/search', { params: { q: searchValue } })
            .then((res) => setSearchSpecies(res))
            .catch((err) => console.log(err));
    }, [searchValue])

    const handleSearchChange = (e) => {
        const value = e.target.value;
        if (!value.startsWith(' ')) {
            setValue(value);
        }
    }

    return (
        <Fragment>
            <HomePageSearchInput
                width="464px"
                placeholder="Nhập thông tin loài cần tìm..."
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton onClick={() => {}}>
                            <Search fontSize="large" />
                        </IconButton>
                    </InputAdornment>
                }
                onChange={handleSearchChange}
            />
            {searchGenus.length !== 0 && searchSpecies.length != 0 && (
                <Box
                    className={cx('result-search-container')}
                    sx={{ bgcolor: 'background.paper', boxShadow: 8 }}
                >
                    <List className={cx('result-search-content', 'custom-scrollbar')}>
                        {searchGenus.length !== 0 && (
                            <Box component="li">
                                <Box component="ul">
                                    <ListSubheader sx={{ lineHeight: '40px' }}>Chi thực vật</ListSubheader>
                                    {searchGenus.map((item, idx) => (
                                        <ListItemButton
                                            key={idx} sx={{ fontWeight: 500 }}
                                            component={Link} to={`/${item.sci_name.toLowerCase()}`}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    justifyContent: 'center',
                                                    color: (searchValue.toLowerCase() === item.sci_name.toLowerCase())
                                                        ? 'text.active1'
                                                        : 'inherit'
                                                }}
                                            >
                                                <AccountTreeOutlined />
                                            </ListItemIcon>
                                            <Marker mark={searchValue} options={{ className: 'highlighter' }}>
                                                {item.sci_name}
                                            </Marker>
                                        </ListItemButton>
                                    ))}
                                </Box>
                            </Box>
                        )}
                        {searchSpecies.length !== 0 && (
                            <Box component="li">
                                <Box component="ul">
                                    <ListSubheader sx={{ lineHeight: '40px' }}>Loài thực vật</ListSubheader>
                                    {searchSpecies.map((item, idx) => (
                                        <ListItemButton
                                            key={idx} sx={{ fontWeight: 500 }}
                                            component={Link} to={`/${item.sci_name.toLowerCase()}`}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    justifyContent: 'center',
                                                    color: (searchValue.toLowerCase() === item.sci_name.toLowerCase())
                                                        ? 'text.active1'
                                                        : 'inherit'
                                                }}
                                            >
                                                <LocalFloristOutlined />
                                            </ListItemIcon>
                                            <Marker mark={searchValue} options={{ className: 'highlighter' }}>
                                                {item.sci_name}
                                            </Marker>
                                        </ListItemButton>
                                    ))}
                                </Box>
                            </Box>
                        )}
                    </List>
                </Box>
            )}
        </Fragment>
    );
}

export default SearchBar;
