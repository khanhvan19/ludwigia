import { Link } from 'react-router-dom';
import { Fragment } from 'react';

import Box from '@mui/material/Box';
import { blue } from '@mui/material/colors';

import HeadContent from './HeadContent';

function References({ data }) {
    return (
        <Box>
            <HeadContent>Tài liệu tham khảo</HeadContent>
            <Box component='ol' pl={6}>
                {data.references.map((item, idx) => (
                    <Box component='li' key={idx} pl={2} mb={1.5}>
                        {item.link !== '' ? (
                            <Box
                                component={Link} to={item.link} target='_blank'
                                sx={{
                                    '&:hover': {
                                        color: blue[900],
                                        textDecoration: 'underline'
                                    }
                                }}
                            >
                                {item.content}
                            </Box>
                        ) : (
                            <Fragment>{item.content}</Fragment>
                        )}
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default References;