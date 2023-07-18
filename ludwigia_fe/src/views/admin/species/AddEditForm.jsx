/* eslint-disable indent */
import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dropzone from 'react-dropzone';
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import Clear from '@mui/icons-material/Clear'
import DescriptionOutlined from '@mui/icons-material/Description'
import UploadFileOutlined from '@mui/icons-material/UploadFileOutlined';

import IntroductionForm from './form/IntroductionForm';
import DescriptionForm from './form/DescriptionForm';
import MicrosurgeryForm from './form/MicrosurgeryForm';
import DistributionForm from './form/DistributionForm';
import PhytochemicalForm from './form/PhytochemicalForm';
import BenifitsForm from './form/BenefitsForm';
import ReferenceForm from './form/ReferenceForm';

import { acceptWordFile } from '~/utils/acceptFileField';
import { CustomStepConnector, FileFieldWrapper } from '~/components/themeMUI/customComponents';

const STEPS = [
    'Giới thiệu',
    'Mô tả',
    'Vi phẩu',
    'Phân bố sinh thái',
    'Hóa thực vật và hoạt tính sinh hoạt',
    'Bộ phận dùng và công dụng',
    'Tài liệu tham khảo'
]

function AddEditForm({ initValue, validateSchema, editItemId }) {
    const [activeStep, setActiveStep] = useState(0);
    const [selectFile, setSelectFile] = useState('')

    const form = useForm({
        defaultValues: initValue,
        resolver: yupResolver(validateSchema)
    })

    useEffect(() => {
        if (selectFile != null) {
            form.reset((value) => ({
                ...value,
                sci_name: selectFile[0]?.name,
                author: selectFile[0]?.name,
                debut_year: selectFile[0]?.size
            }))
        }
    }, [selectFile, form])

    const handleSubmit = (value) => {
        console.log(value);
    }

    const renderStepContent = (step) => {
        switch (step) {
            case 0: return (<IntroductionForm form={form} />);
            case 1: return (<DescriptionForm form={form} />);
            case 2: return (<MicrosurgeryForm form={form} />);
            case 3: return (<DistributionForm form={form} />);
            case 4: return (<PhytochemicalForm form={form} />);
            case 5: return (<BenifitsForm form={form} />);
            case 6: return (<ReferenceForm form={form} />);
            default: return;
        }
    }
    console.log(form.formState.errors);

    return (
        <Fragment>
            <Box mx={-2}>
                <Stepper
                    alternativeLabel
                    activeStep={activeStep}
                    connector={<CustomStepConnector />}
                >
                    {STEPS.map((label, idx) => (
                        <Step key={idx}>
                            <StepLabel onClick={() => setActiveStep(idx)}>
                                {label}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                {(activeStep === 0) && (
                    <Dropzone accept={acceptWordFile} onDrop={(value) => setSelectFile(value)}>
                        {({ getRootProps, getInputProps }) => (
                            <FileFieldWrapper {...getRootProps()} height={80} position='relative' my={3}>
                                <input {...getInputProps()} />
                                <Box textAlign='center' visibility={selectFile[0] ? 'hidden' : 'visible'}>
                                    <UploadFileOutlined fontSize='large' />
                                    <Typography>Kéo thả hoặc chọn file để lấy nội dung</Typography>
                                </Box>
                                {selectFile[0] != null && (
                                    <Fragment>
                                        <Tooltip title={selectFile[0].name} followCursor>
                                            <Box
                                                className='flex-center' position='absolute' overflow='hidden'
                                                top={0} left={0} height='100%' width='100%' px={4}
                                            >
                                                <DescriptionOutlined sx={{ fontSize: 48, mr: 1 }} />
                                                <Box>
                                                    <Typography className='text-eclipse one-line'>{selectFile[0].name}</Typography>
                                                    <Typography variant='body2'>{selectFile[0].size} Byte</Typography>
                                                </Box>
                                            </Box>
                                        </Tooltip>
                                        <IconButton
                                            sx={{ position: 'absolute', top: 0, right: 0 }}
                                            onClick={() => setSelectFile('')}
                                        >
                                            <Clear />
                                        </IconButton>
                                    </Fragment>
                                )}
                            </FileFieldWrapper>
                        )}
                    </Dropzone>
                )}
                {renderStepContent(activeStep)}
                <Box mt={3} display='flex' alignItems='center' justifyContent='flex-end'>
                    {(activeStep !== 0) && (
                        <Button
                            size='large'
                            color='cancel'
                            variant='contained'
                            onClick={() => setActiveStep((prev) => prev - 1)}
                            sx={{ mr: 2 }}
                        >
                            Trở lại
                        </Button>
                    )}
                    {(activeStep !== STEPS.length - 1) && (
                        <Button
                            size='large'
                            color='primary'
                            variant='contained'
                            onClick={() => setActiveStep((prev) => prev + 1)}
                        >
                            Tiếp theo
                        </Button>
                    )}
                    {(activeStep === STEPS.length - 1) && (
                        <Button
                            type='submit'
                            size='large'
                            color='primary'
                            variant='contained'
                        >
                            Thêm mới
                        </Button>
                    )}
                </Box>
            </form>
        </Fragment>
    );
}

export default AddEditForm;