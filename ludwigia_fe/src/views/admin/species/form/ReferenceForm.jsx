import { Fragment } from 'react';
import { useFieldArray } from 'react-hook-form';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import DatasetLinkedOutlined from '@mui/icons-material/DatasetLinkedOutlined';
import RemoveCircleOutline from '@mui/icons-material/RemoveCircleOutline';

import InputField from '~/components/ui/inputField/InputField';
import TextAreaField from '~/components/ui/inputField/textAreaField';

function ReferenceForm({ form, readOnlyMode }) {
    const referencesForm = useFieldArray({
        name: 'references',
        control: form.control
    });

    return (
        <Box mt={3}>
            {referencesForm.fields.map((field, index) => (
                <Fragment key={field.id}>
                    {index >= 0 && (
                        <Box
                            my={2} alignItems='center' justifyContent='space-between'
                            display={referencesForm.fields.length > 1 ? 'flex' : 'none' }
                        >
                            <Box display='flex' alignItems='center' color='text.accent1'>
                                <DatasetLinkedOutlined sx={{ mr: .75 }} />
                                <Typography fontWeight={600} fontStyle='italic'>
                                    Tài liệu tham khảo số {index + 1}:
                                </Typography>
                            </Box>
                            {!readOnlyMode && (
                                <Button
                                    startIcon={<RemoveCircleOutline />}
                                    variant='outlined' color='error' size='small'
                                    onClick={() => referencesForm.remove(index)}
                                >
                                    Xóa tài liệu này
                                </Button>
                            )}
                        </Box>
                    )}
                    <Grid container spacing={2}>
                        <Grid xs={12}>
                            <InputField
                                form={form}
                                name={`references.${index}.link`}
                                label='URL tài liệu trực tuyến'
                                readOnly={readOnlyMode}
                            />
                        </Grid>
                        <Grid xs={12}>
                            <TextAreaField
                                form={form}
                                name={`references.${index}.content`}
                                placeholder='Tên tài liệu tham khảo'
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
                        onClick={() => {
                            referencesForm.append({ content: '', link: '' })
                            form.setFocus(`references.${referencesForm.fields.length}.content`)
                        }}
                    >
                        Thêm tài liệu tham khảo
                    </Button>
                </Box>
            )}
        </Box>
    );
}

export default ReferenceForm;