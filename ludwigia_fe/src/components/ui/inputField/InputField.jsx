import { Controller } from 'react-hook-form';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import ReportOutlined from '@mui/icons-material/ReportOutlined';

import { getErrValidate } from '~/utils/getErrorValidateFrom';

function InputField(props) {
    const {
        form, name, type,
        label, disabled, placeholder, multiline,
        startLabelIcon, endActionIcon, endActionFunction, labelIconColor
    } = props;
    const { formState } = form;

    const splitName = name.split('.');
    const errorValidate = getErrValidate(splitName, formState.errors);

    return (
        <Controller
            name={name}
            control={form.control}
            render = {({ field }) => (
                <TextField
                    {...field}
                    fullWidth
                    type={type}
                    label={label}
                    disabled={disabled}
                    placeholder={placeholder}
                    multiline={multiline}
                    error={!!errorValidate}
                    helperText={errorValidate && (
                        <Typography variant='caption' display='flex' alignItems='center'>
                            <ReportOutlined sx={{ fontSize: '1.25em', mr: .5 }} />
                            {errorValidate?.message}
                        </Typography>
                    )}
                    InputProps={{
                        startAdornment: startLabelIcon && (
                            <InputAdornment position="start">
                                <Icon color={errorValidate ? 'error' : labelIconColor}>
                                    {startLabelIcon}
                                </Icon>
                            </InputAdornment>
                        ),
                        endAdornment: endActionIcon && (
                            <InputAdornment position="end">
                                <IconButton
                                    edge='end'
                                    color={errorValidate ? 'error' : labelIconColor}
                                    onClick={endActionFunction}
                                >
                                    {endActionIcon}
                                </IconButton>
                            </InputAdornment>
                        ),
                        sx: {
                            '& input::placeholder': {
                                fontStyle: 'italic',
                                fontSize: '15px'
                            }
                        }
                    }}
                />
            )}
        />
    );
}

export default InputField;