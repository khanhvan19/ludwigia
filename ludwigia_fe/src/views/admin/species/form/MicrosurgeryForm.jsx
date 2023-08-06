import { Fragment } from 'react';
import { useFieldArray } from 'react-hook-form';

import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider';

import AddCircleTwoTone from '@mui/icons-material/AddCircleTwoTone';
import FormatListNumbered from '@mui/icons-material/FormatListNumbered';
import RemoveCircleTwoTone from '@mui/icons-material/RemoveCircleTwoTone';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import BiotechOutlined from '@mui/icons-material/BiotechOutlined';
import RemoveCircleOutline from '@mui/icons-material/RemoveCircleOutline';

import ImageField from '~/components/ui/inputField/ImageField';
import InputField from '~/components/ui/inputField/InputField';
import { Tooltip } from '@mui/material';

const ExplainsNestedForm = ({ form, nestIndex, readOnlyMode }) => {
    const explainsForm = useFieldArray({
        name: `microsurgerys[${nestIndex}].explains`,
        control: form.control
    });

    const indexEndField = (explainsForm.fields.length - 1) < 0
        ? 0
        : (explainsForm.fields.length - 1);

    return (
        <Grid container spacing={2}>
            {(explainsForm.fields.length === 0)
                ? (
                    <Grid xs={12} display='flex'>
                        <Box flexGrow={1}>
                            <InputField
                                form={form}
                                name={`microsurgerys.${nestIndex}.explains.${0}`}
                                label='Diễn giải chú thích số 1'
                                readOnly={readOnlyMode}
                            />
                        </Box>
                        {!readOnlyMode && (
                            <Box>
                                <Tooltip title='Xóa diễn giải chú thích này' arrow>
                                    <span>
                                        <IconButton
                                            color="error"
                                            disabled={indexEndField === 0}
                                            onClick={() => explainsForm.remove(0)}
                                        >
                                            <RemoveCircleTwoTone fontSize="large" />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                            </Box>
                        )}
                    </Grid>
                )
                : explainsForm.fields.map((field, index) => (
                    <Grid xs={12} key={field.id} display='flex'>
                        <Box flexGrow={1}>
                            <InputField
                                form={form}
                                name={`microsurgerys.${nestIndex}.explains.${index}`}
                                label={`Diễn giải chú thích số ${index + 1}`}
                                readOnly={readOnlyMode}
                            />
                        </Box>
                        {!readOnlyMode && (
                            <Box>
                                <Tooltip title='Xóa diễn giải chú thích này' arrow>
                                    <span>
                                        <IconButton
                                            color="error"
                                            disabled={indexEndField === 0}
                                            onClick={() => explainsForm.remove(index)}
                                        >
                                            <RemoveCircleTwoTone fontSize="large" />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                            </Box>
                        )}
                    </Grid>
                ))
            }
            {!readOnlyMode && (
                <Grid xs={12} textAlign='center'>
                    <Button
                        color="primary" variant='outlined'
                        startIcon={<AddCircleTwoTone />}
                        disabled={form.watch(`microsurgerys.${nestIndex}.explains.${indexEndField}`) === ''}
                        onClick={() => explainsForm.append('')}
                    >
                        Thêm chú giải
                    </Button>
                </Grid>
            )}
        </Grid>
    );
}


function MicrosurgeryForm({ form, readOnlyMode }) {
    const microsurgeryForm = useFieldArray({
        name: 'microsurgerys',
        control: form.control
    });

    return (
        <Box mt={3}>
            {microsurgeryForm.fields.map((field, index) => (
                <Fragment key={field.id}>
                    {index >= 0 && (
                        <Box
                            my={2} alignItems='center' justifyContent='space-between'
                            display={microsurgeryForm.fields.length > 1 ? 'flex' : 'none' }
                        >
                            <Box display='flex' alignItems='center' color='text.accent1'>
                                <BiotechOutlined sx={{ mr: .75 }} />
                                <Typography fontWeight={600} fontStyle='italic'>
                                    Mô tả vi phẩu số {index + 1}:
                                </Typography>
                            </Box>
                            {!readOnlyMode && (
                                <Button
                                    startIcon={<RemoveCircleOutline />}
                                    variant='outlined' color='error'
                                    onClick={() => microsurgeryForm.remove(index)}
                                >
                                    Xóa vi phẩu này
                                </Button>
                            )}
                        </Box>
                    )}
                    <Grid container spacing={2} key={field.id}>
                        <Grid xs={6} container flexDirection='column' alignItems='flex-start'>
                            <Grid xs={12}>
                                <ImageField
                                    form={form}
                                    name={`microsurgerys.${index}.image`}
                                    label={`Vi phẩu thứ ${index + 1}`}
                                    height={240}
                                    disabled={readOnlyMode}
                                />
                            </Grid>
                            <Grid xs={12}>
                                <InputField
                                    form={form}
                                    name={`microsurgerys.${index}.caption`}
                                    label="Mô tả hình ảnh vi phẩu"
                                    readOnly={readOnlyMode}
                                />
                            </Grid>
                        </Grid>
                        <Grid xs={6} flexDirection='column' alignItems='flex-start'>
                            <Box display='flex' alignItems='center' mb={2.25}>
                                <FormatListNumbered sx={{ mr: .75 }} fontSize='small' />
                                <Typography fontSize={15} fontWeight={500} fontStyle='italic'>
                                    Diễn giải chú thích:
                                </Typography>
                            </Box>
                            <Box>
                                <ExplainsNestedForm form={form} nestIndex={index} readOnlyMode={readOnlyMode} />
                            </Box>
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
                        onClick={() => microsurgeryForm.append(
                            { image: '', caption: '', explains: [''] }
                        )}
                    >
                        Thêm vi phẩu
                    </Button>
                </Box>
            )}
        </Box>
    );
}

export default MicrosurgeryForm;
