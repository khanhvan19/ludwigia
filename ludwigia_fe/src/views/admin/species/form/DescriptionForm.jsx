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

function DescriptionForm({ form, readOnlyMode }) {
    const imageForm = useFieldArray({
        name: 'description_images',
        control: form.control
    })

    const indexEndImageField = (imageForm.fields.length - 1) < 0
        ? 0
        : (imageForm.fields.length - 1);

    return (
        <Box mt={3}>
            <Grid container spacing={2}>
                <Grid xs={12}>
                    <Box display='flex' alignItems='center' mb={2}>
                        <ArticleOutlined sx={{ mr: .75 }} fontSize='small' />
                        <Typography fontSize={15} fontWeight={500} fontStyle='italic'>
                            Nội dung mô tả:
                        </Typography>
                    </Box>
                    <TextAreaField
                        form={form}
                        name='description_content'
                        minHeight={280}
                        readOnly={readOnlyMode}
                    />
                </Grid>
                <Grid xs={12}>
                    <Box className='flex-between' mb={2}>
                        <Box display='flex' alignItems='center' >
                            <SatelliteOutlined sx={{ mr: .75 }} fontSize='small'/>
                            <Typography fontSize={15} fontWeight={600} fontStyle='italic'>
                                Hình ảnh mô tả:
                            </Typography>
                        </Box>
                        {!readOnlyMode && (
                            <Button
                                variant='contained' size='small'
                                startIcon={<AddCircleOutline />}
                                disabled={form.watch(`description_images.${indexEndImageField}`) === ''}
                                onClick={() => imageForm.append('')}
                            >
                                Thêm hình ảnh
                            </Button>
                        )}
                    </Box>
                    <Box>
                        <Grid container spacing={2}>
                            {(imageForm.fields.length === 0)
                                ? (
                                    <Grid xs={6}>
                                        <ImageField
                                            form={form}
                                            name={`description_images.${0}`}
                                            label='Hình 1'
                                            height={240}
                                            disabled={readOnlyMode}
                                        />
                                    </Grid>
                                )
                                : imageForm.fields.map((field, index) => (
                                    <Grid xs={6} key={field.id}>
                                        <Box
                                            position='relative' overflow='hidden'
                                            sx={{ '&:hover button' : { transform: 'translateY(0%)' } }}
                                        >
                                            <ImageField
                                                form={form}
                                                name={`description_images.${index}`}
                                                label={`Hình ${index + 1}`}
                                                height={240}
                                                disabled={readOnlyMode}
                                            />
                                            {(imageForm.fields.length !== 1 && !readOnlyMode) && (
                                                <Button
                                                    startIcon={<RemoveCircleOutline />}
                                                    fullWidth color='error' variant='outlined'
                                                    onClick={() => imageForm.remove(index)}
                                                    sx={{
                                                        bgcolor: '#ffffff80', backdropFilter: 'blur(8px)',
                                                        position: 'absolute', bottom: 0, left: 0, borderRadius: '4px',
                                                        transform: 'translateY(100%)', transition: 'all 0.25s ease-in-out',
                                                        '&:hover': { bgcolor: '#ffffff80', textDecoration: 'underline' }
                                                    }}
                                                >
                                                    Xóa hình ảnh này
                                                </Button>
                                            )}
                                        </Box>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default DescriptionForm;
