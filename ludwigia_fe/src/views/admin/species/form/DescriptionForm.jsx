import { useFieldArray } from 'react-hook-form';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import ArticleOutlined from '@mui/icons-material/ArticleOutlined';
import SatelliteOutlined from '@mui/icons-material/SatelliteOutlined';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutline from '@mui/icons-material/RemoveCircleOutline'

import TextAreaField from '~/components/ui/inputField/textAreaField';
import ImageField from '~/components/ui/inputField/ImageField';

function DescriptionForm({ form }) {
    const imageForm = useFieldArray({
        name: 'description.images',
        control: form.control
    })

    return (
        <Box mt={3}>
            <Grid container spacing={2}>
                <Grid xs={12}>
                    <Box display='flex' alignItems='center' mb={2}>
                        <ArticleOutlined sx={{ mr: .75 }} />
                        <Typography fontWeight={600} fontStyle='italic'>Nội dung mô tả:</Typography>
                    </Box>
                    <TextAreaField
                        form={form}
                        name='description.content'
                        minHeight={280}
                    />
                </Grid>
                <Grid xs={12}>
                    <Box className='flex-between' mb={2}>
                        <Box display='flex' alignItems='center' >
                            <SatelliteOutlined sx={{ mr: .75 }} />
                            <Typography fontWeight={600} fontStyle='italic'>Hình ảnh mô tả:</Typography>
                        </Box>
                        <Button
                            variant='contained'
                            startIcon={<AddCircleOutline />}
                            onClick={() => imageForm.append({ link: '' })}
                        >
                            Thêm một hình ảnh mô tả
                        </Button>
                    </Box>
                    <Box>
                        <Grid container spacing={2}>
                            {imageForm.fields.map((field, index) => {
                                if (index >= 0) return (
                                    <Grid xs={6} key={field.id}>
                                        <Box
                                            position='relative' overflow='hidden'
                                            sx={{ '&:hover button' : { transform: 'translateY(0%)' } }}
                                        >
                                            <ImageField
                                                form={form}
                                                name={`description.images.${index}.link`}
                                                label={`Hình ${index + 1}`}
                                                height={240}
                                            />
                                            <Button
                                                startIcon={<RemoveCircleOutline />}
                                                fullWidth color='error'
                                                onClick={() => imageForm.remove(index)}
                                                sx={{
                                                    bgcolor: 'rgba(211 47 47 / 0.04)',
                                                    position: 'absolute', bottom: 0, left: 0, borderRadius: 0,
                                                    transform: 'translateY(100%)', transition: 'all 0.25s ease-in-out',
                                                    '&:hover': { textDecoration: 'underline' }
                                                }}
                                            >
                                                Xóa khung nhập hình ảnh này
                                            </Button>
                                        </Box>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default DescriptionForm;
