import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import SatelliteOutlined from '@mui/icons-material/SatelliteOutlined';
import ArticleOutlined from '@mui/icons-material/ArticleOutlined';

import TextAreaField from '~/components/ui/inputField/textAreaField';
import ImageField from '~/components/ui/inputField/ImageField';

function DistributionForm({ form }) {
    return (
        <Box mt={3}>
            <Grid container spacing={2} columns={16}>
                <Grid xs={10} display='flex' flexDirection='column'>
                    <Box display='flex' alignItems='center' mb={2}>
                        <ArticleOutlined sx={{ mr: .75 }} />
                        <Typography fontWeight={600} fontStyle='italic'>
                            Nội dung mô tả phân bố:
                        </Typography>
                    </Box>
                    <Box flexGrow={1}>
                        <TextAreaField
                            form={form}
                            name='distribution.content'
                            minHeight={280}
                        />
                    </Box>
                </Grid>
                <Grid xs={6} display='flex' flexDirection='column'>
                    <Box display='flex' alignItems='center' mb={2}>
                        <SatelliteOutlined sx={{ mr: .75 }} />
                        <Typography fontWeight={600} fontStyle='italic'>
                            Bảng đồ phân bố:
                        </Typography>
                    </Box>
                    <Box flexGrow={1}>
                        <ImageField
                            form={form}
                            name='distribution.image'
                            label='Bảng đồ phân bố'
                            height={'100%'}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default DistributionForm;