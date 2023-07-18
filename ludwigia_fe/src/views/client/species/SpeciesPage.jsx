import Box from '@mui/material/Box';
import { Link as LinkScroll } from 'react-scroll'

import HeadName from '~/components/ui/HeadName';
import demo1 from '~/assets/images/ludwigia_hyssopifolia.jpg'
import Intro from './content/Intro';
import Description from './content/Description';
import Microsurgery from './content/Microsurgery';
import Distribution from './content/Distribution';
import Phytochemicals from './content/Phytochemicals';
import UsedParts from './content/UsedParts';
import References from './content/References';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';

function SpeciesPage() {
    return (
        <Box>
            <HeadName
                title='Ludgiwia hyssopifolia'
                subTitle='Ludwigia hyssopifolia (G. Don) Exell'
                image={demo1}
            />
            <Box display='flex'>
                <Box bgcolor='background.accent2'>
                    <Box width='198px' position='sticky' top={0}>
                        <MenuList
                            sx={{
                                '& a.active li': {
                                    bgcolor: 'background.active2',
                                    transition: 'all 250ms ease-in-out'
                                }
                            }}
                        >
                            <LinkScroll to='intro' spy={true} smooth={true} offset={-144} duration={500}>
                                <MenuItem divider sx={{ px: 3, py: 2, whiteSpace: 'normal', fontWeight: 600 }}>
                                    Giới thiệu
                                </MenuItem>
                            </LinkScroll>
                            <LinkScroll to='description' spy={true} smooth={true} offset={1} duration={500}>
                                <MenuItem divider sx={{ px: 3, py: 2, whiteSpace: 'normal', fontWeight: 600 }}>
                                    Mô tả
                                </MenuItem>
                            </LinkScroll>
                            <LinkScroll to='microsurgery' spy={true} smooth={true} offset={1} duration={500}>
                                <MenuItem divider sx={{ px: 3, py: 2, whiteSpace: 'normal', fontWeight: 600 }}>
                                    Vi phẩu
                                </MenuItem>
                            </LinkScroll>
                            <LinkScroll to='distribution' spy={true} smooth={true} offset={1} duration={500}>
                                <MenuItem divider sx={{ px: 3, py: 2, whiteSpace: 'normal', fontWeight: 600 }}>
                                    Phân bố sinh thái
                                </MenuItem>
                            </LinkScroll>
                            <LinkScroll to='phytochemicals' spy={true} smooth={true} offset={1} duration={500}>
                                <MenuItem divider sx={{ px: 3, py: 2, whiteSpace: 'normal', fontWeight: 600 }}>
                                    Hóa thực vật và hoạt tính sinh hoạt
                                </MenuItem>
                            </LinkScroll>
                            <LinkScroll to='used-parts' spy={true} smooth={true} offset={1} duration={500}>
                                <MenuItem divider sx={{ px: 3, py: 2, whiteSpace: 'normal', fontWeight: 600 }}>
                                    Bộ phận dùng và công dụng
                                </MenuItem>
                            </LinkScroll>
                            <LinkScroll to='references' spy={true} smooth={true} offset={1} duration={500}>
                                <MenuItem divider sx={{ px: 3, py: 2, whiteSpace: 'normal', fontWeight: 600 }}>
                                    Tài liệu tham khảo
                                </MenuItem>
                            </LinkScroll>
                        </MenuList>
                    </Box>
                </Box>
                <Box p={3}>
                    <Box id='intro' pb={10}><Intro /></Box>
                    <Box id='description' pb={10}><Description /></Box>
                    <Box id='microsurgery' pb={10}><Microsurgery /></Box>
                    <Box id='distribution' pb={10}><Distribution /></Box>
                    <Box id='phytochemicals' pb={10}><Phytochemicals /></Box>
                    <Box id='used-parts' pb={10}><UsedParts /></Box>
                    <Box id='references' pb={10}><References /></Box>
                </Box>
            </Box>
        </Box>
    );
}

export default SpeciesPage;