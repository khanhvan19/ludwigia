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
import ScienceOutlined from '@mui/icons-material/ScienceOutlined';

import InputField from '~/components/ui/inputField/InputField';
import ImageField from '~/components/ui/inputField/ImageField';
import TextAreaField from '~/components/ui/inputField/textAreaField';
import MultipleInputField from '~/components/ui/inputField/MultipleInputField';


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

function PhytochemicalForm({ form, readOnlyMode }) {
    const phytochemicalForm = useFieldArray({
        name: 'phytochemicals',
        control: form.control
    });

    return (
        <Box mt={3}>
            {phytochemicalForm.fields.map((field, index) => (
                <Fragment key={field.id}>
                    {index >= 0 && (
                        <Box
                            alignItems='center' justifyContent='space-between' my={2}
                            display={phytochemicalForm.fields.length > 1 ? 'flex' : 'none' }
                        >
                            <Box display='flex' alignItems='center' color='text.accent1'>
                                <ScienceOutlined sx={{ mr: .75 }} />
                                <Typography fontWeight={600} fontStyle='italic'>
                                    Hoạt chất số {index + 1}:
                                </Typography>
                            </Box>
                            {!readOnlyMode && (
                                <Button
                                    startIcon={<RemoveCircleOutline />}
                                    variant='outlined' color='error'
                                    onClick={() => phytochemicalForm.remove(index)}
                                >
                                    Xóa hoạt chất này
                                </Button>
                            )}
                        </Box>
                    )}
                    <Grid container spacing={2} columns={16} >
                        <Grid xs={10} container>
                            <Grid xs={13}>
                                <InputField
                                    form={form}
                                    name={`phytochemicals.${index}.bio_active`}
                                    label='Hoạt chất'
                                    readOnly={readOnlyMode}
                                />
                            </Grid>
                            <Grid xs={3}>
                                <InputField
                                    form={form}
                                    type='number'
                                    name={`phytochemicals.${index}.bio_reference`}
                                    label='TLTK số'
                                    readOnly={readOnlyMode}
                                />
                            </Grid>
                            <Grid xs={16}>
                                <InputField
                                    form={form}
                                    name={`phytochemicals.${index}.chemical_group`}
                                    label='Hoạt chất thuộc nhóm'
                                    readOnly={readOnlyMode}
                                />
                            </Grid>
                            <Grid xs={16}>
                                <InputField
                                    form={form}
                                    name={`phytochemicals.${index}.segment`}
                                    label='Phân đoạn'
                                    readOnly={readOnlyMode}
                                />
                            </Grid>
                            <Grid xs={16}>
                                <MultipleInputField
                                    form={form}
                                    name={`phytochemicals.${index}.spectrum`}
                                    label='Quang phổ'
                                    options={[]}
                                    readOnly={readOnlyMode}
                                />
                            </Grid>
                        </Grid>
                        <Grid xs={6}>
                            <ImageField
                                form={form}
                                name={`phytochemicals.${index}.chemical_structure`}
                                label='Cấu trúc hóa học'
                                height={'100%'}
                                disabled={readOnlyMode}
                            />
                        </Grid>
                        <Grid xs={8}>
                            <Box display='flex' alignItems='center' mb={2}>
                                <WindPowerOutlined sx={{ mr: .75 }} fontSize='small' />
                                <Typography fontSize={15} fontWeight={600} fontStyle='italic'>
                                    Tính chất vật lý:
                                </Typography>
                            </Box>
                            <TextAreaField
                                form={form}
                                name={`phytochemicals.${index}.physical_properties`}
                                minHeight={160}
                                readOnly={readOnlyMode}
                            />
                        </Grid>
                        <Grid xs={8}>
                            <Box display='flex' alignItems='center' mb={2}>
                                <VaccinesOutlined sx={{ mr: .75 }} fontSize='small'/>
                                <Typography fontSize={15} fontWeight={500} fontStyle='italic'>
                                    Tác dụng dược lý:
                                </Typography>
                            </Box>
                            <TextAreaField
                                form={form}
                                name={`phytochemicals.${index}.pharma_effect`}
                                minHeight={160}
                                readOnly={readOnlyMode}
                            />
                        </Grid>
                    </Grid>
                    <Divider sx={{ border: '1px dashed', borderColor: 'divider', my: 2 }} />
                </Fragment>
            ))}
            {!readOnlyMode && (
                <Box textAlign='center'>
                    <Button
                        startIcon={<AddCircleOutline />}
                        variant='contained'
                        onClick={() => phytochemicalForm.append(ADD_DEFAULT_VALUE_FORM)}
                    >
                        Thêm hoạt chất
                    </Button>
                </Box>
            )}
        </Box>
    );
}

export default PhytochemicalForm;