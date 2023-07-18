import { Fragment } from 'react';
import { useFieldArray } from 'react-hook-form';

import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import AddCircleTwoTone from '@mui/icons-material/AddCircleTwoTone';
import FormatListNumbered from '@mui/icons-material/FormatListNumbered';
import RemoveCircleTwoTone from '@mui/icons-material/RemoveCircleTwoTone';
import SatelliteOutlined from '@mui/icons-material/SatelliteOutlined';

import ImageField from '~/components/ui/inputField/ImageField';
import InputField from '~/components/ui/inputField/InputField';
import { Button, Divider } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';

function ExplainsNestedForm({ form, nestIndex }) {
    const explainsForm = useFieldArray({
        name: `microsurgery[${nestIndex}].explains`,
        control: form.control
    });

    return (
        <Grid container spacing={2}>
            {explainsForm.fields.map((field, index) => (
                <Grid xs={12} key={field.id} display='flex'>
                    <Box flexGrow={1}>
                        <InputField
                            form={form}
                            name={`microsurgery.${nestIndex}.explains.${index}.content`}
                            label={`Diễn giải chú thích số ${index + 1}`}
                        />
                    </Box>
                    {index == 0 ? (
                        <Grid className="flex-center" p={0}>
                            <Tooltip title="Thêm một chú thích" arrow>
                                <IconButton color="primary" onClick={() => explainsForm.append({ content: '' })}>
                                    <AddCircleTwoTone fontSize="large" />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    ) : (
                        <Grid className="flex-center" p={0}>
                            <Tooltip title="Xóa chú thích này" arrow>
                                <IconButton color="error" onClick={() => explainsForm.remove(index)}>
                                    <RemoveCircleTwoTone fontSize="large" />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    )}
                </Grid>
            ))}
        </Grid>
    );
}

function MicrosurgeryForm({ form }) {
    const microsurgeryForm = useFieldArray({
        name: 'microsurgery',
        control: form.control
    });

    return (
        <Box mt={3}>
            {microsurgeryForm.fields.map((field, index) => (
                <Fragment key={field.id}>
                    {index >= 0 && (
                        <Box
                            textAlign='end' my={2}
                            display={microsurgeryForm.fields.length > 1 ? 'block' : 'none' }
                        >
                            <Button
                                startIcon={<RemoveCircleOutline />}
                                variant='outlined' color='error'
                                onClick={() => microsurgeryForm.remove(index)}
                            >
                                Xóa vi phẩu này
                            </Button>
                        </Box>
                    )}
                    <Grid container spacing={2} key={field.id}>
                        <Grid xs={6} container flexDirection='column' alignItems='flex-start'>
                            <Grid xs={12}>
                                <Box display='flex' alignItems='center' mb={2}>
                                    <SatelliteOutlined sx={{ mr: .75 }} />
                                    <Typography fontWeight={600} fontStyle='italic'>Hình ảnh vi phẩu:</Typography>
                                </Box>
                                <ImageField
                                    form={form}
                                    name={`microsurgery.${index}.image`}
                                    label={`Vi phẩu thứ ${index + 1}`}
                                    height={240}
                                />
                            </Grid>
                            <Grid xs={12}>
                                <InputField
                                    form={form}
                                    name={`microsurgery.${index}.caption`}
                                    label="Mô tả hình ảnh vi phẩu"
                                />
                            </Grid>
                        </Grid>
                        <Grid xs={6} flexDirection='column' alignItems='flex-start'>
                            <Box display='flex' alignItems='center' mb={2}>
                                <FormatListNumbered sx={{ mr: .75 }} />
                                <Typography fontWeight={600} fontStyle='italic'>Diễn giải chú thích:</Typography>
                            </Box>
                            <Box>
                                <ExplainsNestedForm form={form} nestIndex={index} />
                            </Box>
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
                    onClick={() => microsurgeryForm.append(
                        { image: '', caption: '', explains: [{ content: '' }] }
                    )}
                >
                    Thêm một hình ảnh vi phẩu
                </Button>
            </Box>
        </Box>
    );
}

export default MicrosurgeryForm;
