import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import useAxiosPrivate from '~/utils/axiosPrivate';
import InputField from '~/components/ui/inputField/InputField';
import { TOAST_STYLE } from '~/components/ui/customToastify';

function AddEditForm({ initValue, validateSchema, onCloseDialog, editItemId }) {
    const axiosPrivate = useAxiosPrivate();

    const form = useForm({
        defaultValues: initValue,
        resolver: yupResolver(validateSchema)
    })

    const handleSubmit = (value) => {
        if (!editItemId) {
            handleAddGenus(value)
        } else {
            handleEditGenus(value, editItemId)
        }
        onCloseDialog();
    }

    const handleAddGenus = (data) => {
        axiosPrivate
            .post('/genus/', data)
            .then((res) => {
                form.reset();
                onCloseDialog();
                toast.success(res.message, TOAST_STYLE)
            })
            .catch((err) => {
                if (err.status !== 403) toast.error(err.data.message, TOAST_STYLE)
            })
    }

    const handleEditGenus = (data, id) => {
        axiosPrivate
            .put(`/genus/${id}`, data)
            .then((res) => {
                onCloseDialog();
                toast.success(res.message, TOAST_STYLE)
            })
            .catch((err) => {
                if (err.status !== 403) toast.error(err.data.message, TOAST_STYLE)
            })
    }

    return (
        <Fragment>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <DialogTitle fontWeight={700} lineHeight={1.5}>
                    {editItemId ? 'Chỉnh sửa Chi thực vật' : 'Thêm mới Chi thực vật'}
                </DialogTitle>
                <DialogContent dividers sx={{ py: 3 }}>
                    <Box>
                        <InputField
                            form={form}
                            name='sci_name'
                            label='Tên khoa học'
                            placeholder='Nhập tên khoa học của Chi'
                        />
                    </Box>
                    <Box mt={3}>
                        <InputField
                            form={form}
                            name='vie_name'
                            label='Tên tiếng Việt'
                            placeholder='Nhập tên tiếng Việt của Chi'
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ py: 2, px: 3 }}>
                    <Button
                        variant='contained' size='large' color='cancel'
                        onClick={() => {
                            form.reset();
                            onCloseDialog();
                        }}
                    >
                        Trở lại
                    </Button>
                    <Button type='submit' variant='contained' size='large'>
                        {editItemId ? 'Chỉnh sửa' : 'Thêm mới'}
                    </Button>
                </DialogActions>
            </form>
        </Fragment>
    );
}

export default AddEditForm;