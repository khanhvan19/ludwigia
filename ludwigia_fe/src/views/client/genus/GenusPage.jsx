import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import HeadName from '~/components/ui/HeadName';
import PlantImageCard from '~/components/ui/card/PlantImageCard';

import demo1 from '~/assets/images/ludwigia_hyssopifolia.jpg'
import demo2 from '~/assets/images/1.jpg'
import demo3 from '~/assets/images/ludwigia_epilobioides.jpg'
import demo4 from '~/assets/images/2.jpg'
import demo5 from '~/assets/images/ludwigia_perennis.jpg'
import demo6 from '~/assets/images/1370.jpg'
import frameImage from '~/assets/images/frame-image.png'
import { Container } from '@mui/material';
import { Link } from 'react-router-dom';
const data = [
    { image: demo1, name: 'Ludwigia hyssopifolia' },
    { image: demo2, name: 'Ludwigia octovalvis ' },
    { image: demo3, name: 'Ludwigia epilobioides' },
    { image: demo4, name: 'Ludwigia adscendens' },
    { image: demo5, name: 'Ludwigia perennis' },
    { image: demo6, name: 'Ludwigia prostrata' }
]

import styles from './genusPage.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function GenusPage() {
    return (
        <Box>
            <HeadName title='Ludwigia' subTitle='Chi rau mương' />
            <Container maxWidth='xl' component={Box} pt={8}>
                <Grid container spacing={2}>
                    {data.map((item, idx) => (
                        <Grid xs={4} key={idx} className='flex-center'>
                            <Box component={Link} to='/species' className={cx('plant-item')}>
                                <PlantImageCard
                                    frameImage={frameImage}
                                    dataImage={item.image}
                                    height='200px'
                                />
                                <Typography
                                    mt={1.5} mb={4}
                                    variant='h6' color='text.accent1'
                                    textAlign='center' fontStyle='italic'
                                    className='item-name'
                                >
                                    {item.name}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}

export default GenusPage;