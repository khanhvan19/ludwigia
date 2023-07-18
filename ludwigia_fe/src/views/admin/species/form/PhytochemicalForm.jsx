import { Fragment } from 'react';
import { useFieldArray } from 'react-hook-form';

import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'

import AddCircleOutline from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutline from '@mui/icons-material/RemoveCircleOutline'
import VaccinesOutlined from '@mui/icons-material/VaccinesOutlined'
import WindPowerOutlined from '@mui/icons-material/WindPowerOutlined';

import InputField from '~/components/ui/inputField/InputField';
import ImageField from '~/components/ui/inputField/ImageField';
import TextAreaField from '~/components/ui/inputField/textAreaField';


const ADD_DEFAULT_VALUE_FORM = {
    bio_active: '',
    bio_reference: '',
    chemical_group: '',
    segment: '',
    physical_properties: '',
    spectrum: [],
    chemical_structure: '',
    pharma_effect: ''
}

function PhytochemicalForm({ form }) {
    const phytochemicalForm = useFieldArray({
        name: 'phytochemical',
        control: form.control
    });

    return (
        <Box mt={3}>
            {phytochemicalForm.fields.map((field, index) => (
                <Fragment key={field.id}>
                    {index >= 0 && (
                        <Box
                            textAlign='end' my={2}
                            display={phytochemicalForm.fields.length > 1 ? 'block' : 'none' }
                        >
                            <Button
                                startIcon={<RemoveCircleOutline />}
                                variant='outlined' color='error'
                                onClick={() => phytochemicalForm.remove(index)}
                            >
                                Xóa hoạt chất này
                            </Button>
                        </Box>
                    )}
                    <Grid container spacing={2} columns={16} >
                        <Grid xs={10} container>
                            <Grid xs={13}>
                                <InputField
                                    form={form}
                                    name={`phytochemical.${index}.bio_active`}
                                    label='Hoạt chất'
                                />
                            </Grid>
                            <Grid xs={3}>
                                <InputField
                                    form={form}
                                    name={`phytochemical.${index}.bio_reference`}
                                    label='TLTK số'
                                />
                            </Grid>
                            <Grid xs={16}>
                                <InputField
                                    form={form}
                                    name={`phytochemical.${index}.chemical_group`}
                                    label='Hoạt chất thuộc nhóm'
                                />
                            </Grid>
                            <Grid xs={16}>
                                <InputField
                                    form={form}
                                    name={`phytochemical.${index}.segment`}
                                    label='Phân đoạn'
                                />
                            </Grid>
                            <Grid xs={16}>
                                <InputField
                                    form={form}
                                    name={`phytochemical.${index}.spectrum`}
                                    label='Quang phổ'
                                />
                            </Grid>
                        </Grid>
                        <Grid xs={6}>
                            <ImageField
                                form={form}
                                name={`phytochemical.${index}.chemical_structure`}
                                label='Cấu trúc hóa học'
                                height={'100%'}
                            />
                        </Grid>
                        <Grid xs={16}>
                            <Box display='flex' alignItems='center' mb={2}>
                                <WindPowerOutlined sx={{ mr: .75 }} />
                                <Typography fontWeight={600} fontStyle='italic'>Tính chất vật lý:</Typography>
                            </Box>
                            <TextAreaField
                                form={form}
                                name={`phytochemical.${index}.physical_properties`}
                                minHeight={160}
                            />
                        </Grid>
                        <Grid xs={16}>
                            <Box display='flex' alignItems='center' mb={2}>
                                <VaccinesOutlined sx={{ mr: .75 }} />
                                <Typography fontWeight={600} fontStyle='italic'>Tác dụng dược lý:</Typography>
                            </Box>
                            <TextAreaField
                                form={form}
                                name={`phytochemical.${index}.pharma_effect`}
                                minHeight={160}
                            />
                        </Grid>
                    </Grid>
                    <Divider sx={{ border: '1px dashed', borderColor: 'divider', my: 2 }} />
                </Fragment>
            ))}
            <Box textAlign='center'>
                <Button
                    startIcon={<AddCircleOutline />}
                    variant='contained' size='large'
                    sx={{ textTransform: 'uppercase' }}
                    onClick={() => phytochemicalForm.append(ADD_DEFAULT_VALUE_FORM)}
                >
                    Thêm một hoạt chất
                </Button>
            </Box>
        </Box>
    );
}

export default PhytochemicalForm;