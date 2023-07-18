import { Fragment } from 'react';
import { Controller } from 'react-hook-form';
import Dropzone from 'react-dropzone';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip'

import Clear from '@mui/icons-material/Clear';
import CloudUploadOutlined from '@mui/icons-material/CloudUploadOutlined';
import ReportOutlined from '@mui/icons-material/ReportOutlined';

import { acceptImageFile } from '~/utils/acceptFileField';
import { FileFieldWrapper } from '~/components/themeMUI/customComponents';
import { getErrValidate } from '~/utils/getErrorValidateFrom';

function ImageField(props) {
    const {
        form, name,
        label, disabled,
        width, height
    } = props;
    const { formState } = form;

    const splitName = name.split('.');
    const errorValidate = getErrValidate(splitName, formState.errors);

    const handleRemoveFile = () => {
        form.setValue(name, '')
    }

    return (
        <Controller
            name={name}
            control={form.control}
            render = {({ field: { onChange, onBlur, value } }) => (
                <Dropzone
                    accept={acceptImageFile}
                    onDrop={onChange}
                    disabled={disabled}
                >
                    {({ getRootProps, getInputProps }) => (
                        <FileFieldWrapper
                            {...getRootProps()}
                            error={errorValidate}
                            height={height} width={width} position='relative'
                        >
                            <input {...getInputProps()} onBlur={onBlur} />
                            <Box textAlign='center' visibility={value[0] ? 'hidden' : 'visible'}>
                                <CloudUploadOutlined sx={{ fontSize: 40 }} />
                                <Typography fontWeight={600} fontSize={18}>{label}</Typography>
                                {errorValidate ? (
                                    <Typography variant='body2' className='flex-center'>
                                        <ReportOutlined sx={{ fontSize: '1.25em', mr: .5 }} />
                                        {errorValidate?.message}
                                    </Typography>
                                ) : (
                                    <Fragment>
                                        <Typography variant='body2'>Kéo thả hoặc chọn hình ảnh tải lên</Typography>
                                        <Typography variant='caption' component='div'>
                                            File hợp lệ: .png, .jpg, .jpeg, .webp, .svg, .gif
                                        </Typography>
                                    </Fragment>
                                )}
                            </Box>

                            {value[0] != null && (
                                <Fragment>
                                    <Box
                                        className='flex-center'
                                        position='absolute' overflow='hidden'
                                        top={0} left={0} height='100%' width='100%'
                                    >
                                        {(value[0] instanceof File) ? (
                                            <Tooltip title={value[0]?.name} followCursor>
                                                <Box
                                                    component='img' alt={value[0].name}
                                                    src={URL.createObjectURL(value[0])}
                                                    height='calc(100% - 4px)'
                                                />
                                            </Tooltip>
                                        ) : (
                                            <Box component='img' src={value} alt={value} height='calc(100% - 4px)' />
                                        )}
                                    </Box>
                                    <Tooltip title='Chọn lại ảnh' arrow>
                                        <IconButton
                                            sx={{ position: 'absolute', top: 0, right: 0 }}
                                            onClick={handleRemoveFile}
                                        >
                                            <Clear />
                                        </IconButton>
                                    </Tooltip>
                                </Fragment>
                            )}
                        </FileFieldWrapper>
                    )}
                </Dropzone>
            )}
        />
    );
}

export default ImageField;