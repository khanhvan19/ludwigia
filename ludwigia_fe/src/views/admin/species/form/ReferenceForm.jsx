import { Fragment } from 'react';
import { useFieldArray } from 'react-hook-form';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button';

import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import RemoveCircleTwoTone from '@mui/icons-material/RemoveCircleTwoTone'

import SelectField from '~/components/ui/inputField/SelectField';
import InputField from '~/components/ui/inputField/InputField';

const LANGUAGE_OPTION = [
    { value: 'en', label: 'Tài liệu tiếng Anh' },
    { value: 'vi', label: 'Tài liệu tiếng Việt' }
]

function ReferenceForm({ form }) {
    const referencesForm = useFieldArray({
        name: 'references',
        control: form.control
    });

    return (
        <Box mt={3}>
            {referencesForm.fields.map((field, index) => (
                <Fragment key={field.id}>
                    <Grid container spacing={2} mt={index > 0 ? 1 : 0}>
                        <Grid xs={12}>
                            <InputField
                                form={form}
                                name={`references.${index}.content`}
                                label={`Tài liệu tham khảo số ${index + 1}`}
                                multiline={true}
                            />
                        </Grid>
                        <Grid xs={12} container>
                            <Grid flexGrow={1}>
                                <InputField
                                    form={form}
                                    name={`references.${index}.link`}
                                    label='URL tài liệu trực tuyến'
                                />
                            </Grid>
                            <Grid xs={3}>
                                <SelectField
                                    form={form}
                                    name={`references.${index}.language`}
                                    options={LANGUAGE_OPTION}
                                    label='Ngôn ngữ'
                                />
                            </Grid>
                            {index >= 0 && (
                                <Grid
                                    alignItems='center' p={0}
                                    display={referencesForm.fields.length > 1 ? 'flex' : 'none' }
                                >
                                    <Tooltip title='Xóa tài liệu tham khảo này' arrow>
                                        <IconButton
                                            color='error'
                                            onClick={() => referencesForm.remove(index)}
                                        >
                                            <RemoveCircleTwoTone fontSize='large' />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            )}
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
                    onClick={() => referencesForm.append({ content: '', link: '', language: 'en' })}
                >
                    Thêm một tài liệu tham khảo
                </Button>
            </Box>
        </Box>
    );
}

export default ReferenceForm;