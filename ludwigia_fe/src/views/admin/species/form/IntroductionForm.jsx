import { useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import AddCircleTwoTone from '@mui/icons-material/AddCircleTwoTone'
import DashboardCustomizeOutlined from '@mui/icons-material/DashboardCustomizeOutlined'
import DashboardOutlined from '@mui/icons-material/DashboardOutlined'
import RemoveCircleTwoTone from '@mui/icons-material/RemoveCircleTwoTone'

import ImageField from '~/components/ui/inputField/ImageField';
import InputField from '~/components/ui/inputField/InputField';
import SelectField from '~/components/ui/inputField/SelectField';

import axiosPublic from '~/utils/axiosPublic';

function IntroductionForm({ form }) {
    const [genusList, setGenusList] = useState([])
    const [genusOption, setGenusOption] = useState([])

    const otherNameForm = useFieldArray({
        name: 'other_name',
        control: form.control
    })

    const vieNameForm = useFieldArray({
        name: 'vie_name',
        control: form.control
    })

    useEffect(() => {
        axiosPublic
            .get('/genus/')
            .then((res) => {
                setGenusList(res)
                var options = res.map(
                    ({ _id: value, sci_name: label }) => ({ value, label })
                );
                setGenusOption(options)
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid xs={12}>
                    <Box display='flex' alignItems='center'>
                        <DashboardOutlined sx={{ mr: .75 }} />
                        <Typography fontWeight={600} fontStyle='italic'>Thông tin chung:</Typography>
                    </Box>
                </Grid>
                <Grid xs={6} container>
                    <Grid xs={12}>
                        <SelectField
                            form={form}
                            name='genus_ref'
                            options={genusOption}
                            label='Loài thuộc Chi'
                        />
                    </Grid>
                    <Grid xs={12}>
                        <InputField
                            form={form}
                            name='sci_name'
                            label='Tên khoa học'
                        />
                    </Grid>
                    <Grid xs={8}>
                        <InputField
                            form={form}
                            name='author'
                            label='Tác giả mô tả'
                        />
                    </Grid>
                    <Grid xs={4}>
                        <InputField
                            form={form}
                            name='debut_year'
                            type='number'
                            label='Năm mô tả'
                        />
                    </Grid>
                    <Grid xs={12}>
                        <InputField
                            form={form}
                            name='family_description'
                            label='Mô tả về Họ'
                            multiline={true}
                        />
                    </Grid>
                </Grid>
                <Grid xs={6}>
                    <ImageField
                        form={form}
                        name='avatar'
                        label='Hình ảnh đại diện'
                        height='100%'
                    />
                </Grid>
                <Grid xs={6} container flexDirection='column' alignItems='flex-start'>
                    <Grid xs={12}>
                        <Box display='flex' alignItems='center'>
                            <DashboardCustomizeOutlined sx={{ mr: .75 }} />
                            <Typography fontWeight={600} fontStyle='italic'>Tên khoa học khác:</Typography>
                        </Box>
                    </Grid>
                    {otherNameForm.fields.map((field, index) => (
                        <Grid xs={12} key={field.id} container flexWrap='nowrap'>
                            <Grid flexGrow={1}>
                                <InputField
                                    form={form}
                                    name={`other_name.${index}.name`}
                                    label='Tên khoa học'
                                />
                            </Grid>
                            <Grid xs={3} pr={0}>
                                <InputField
                                    form={form}
                                    name={`other_name.${index}.reference`}
                                    label='TLTK số'
                                />
                            </Grid>
                            {index == 0 ? (
                                <Grid className='flex-center' p={0}>
                                    <Tooltip title='Thêm một tên khoa học khác' arrow>
                                        <IconButton
                                            color='primary'
                                            onClick={() => otherNameForm.append({ name: '', reference: '' })}
                                        >
                                            <AddCircleTwoTone fontSize='large' />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            ) : (
                                <Grid className='flex-center' p={0}>
                                    <Tooltip title='Xóa tên này' arrow>
                                        <IconButton
                                            color='error'
                                            onClick={() => otherNameForm.remove(index)}
                                        >
                                            <RemoveCircleTwoTone fontSize='large' />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            )}
                        </Grid>
                    ))}
                </Grid>
                <Grid xs={6} container flexDirection='column' alignItems='flex-start'>
                    <Grid xs={12}>
                        <Box display='flex' alignItems='center'>
                            <DashboardCustomizeOutlined sx={{ mr: .75 }} />
                            <Typography fontWeight={600} fontStyle='italic'>Tên tiếng Việt:</Typography>
                        </Box>
                    </Grid>
                    {vieNameForm.fields.map((field, index) => (
                        <Grid xs={12} key={field.id} container flexWrap='nowrap'>
                            <Grid flexGrow={1}>
                                <InputField
                                    form={form}
                                    name={`vie_name.${index}.name`}
                                    label='Tên tiếng Việt'
                                />
                            </Grid>
                            <Grid xs={3} pr={0}>
                                <InputField
                                    form={form}
                                    name={`vie_name.${index}.reference`}
                                    label='TLTK số'
                                />
                            </Grid>
                            {index == 0 ? (
                                <Grid className='flex-center' p={0}>
                                    <Tooltip title='Thêm một tên tiếng Việt' arrow>
                                        <IconButton
                                            color='primary'
                                            onClick={() => vieNameForm.append({ name: '', reference: '' })}
                                        >
                                            <AddCircleTwoTone fontSize='large' />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            ) : (
                                <Grid className='flex-center' p={0}>
                                    <Tooltip title='Xóa tên này' arrow>
                                        <IconButton
                                            color='error'
                                            onClick={() => vieNameForm.remove(index)}
                                        >
                                            <RemoveCircleTwoTone fontSize='large' />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            )}
                        </Grid>
                    ))}
                </Grid>
                <Grid xs={12} container>
                    <Grid xs={12}>
                        <Box display='flex' alignItems='center'>
                            <DashboardOutlined sx={{ mr: .75 }} />
                            <Typography fontWeight={600} fontStyle='italic'>Phân loại theo hệ thống Takhtajan:</Typography>
                        </Box>
                    </Grid>
                    <Grid xs={12} container>
                        <Grid xs={5}>
                            <InputField
                                form={form}
                                name='kingdom.name'
                                label='Thuộc giới'
                            />
                        </Grid>
                        <Grid xs={5}>
                            <InputField
                                form={form}
                                name='kingdom.nomenclature'
                                label='Danh pháp khoa học'
                            />
                        </Grid>
                        <Grid xs={2}>
                            <InputField
                                form={form}
                                name='kingdom.reference'
                                label='TLTK số'
                            />
                        </Grid>
                    </Grid>
                    <Grid xs={12} container>
                        <Grid xs={5}>
                            <InputField
                                form={form}
                                name='division.name'
                                label='Thuộc ngành'
                            />
                        </Grid>
                        <Grid xs={5}>
                            <InputField
                                form={form}
                                name='division.nomenclature'
                                label='Danh pháp khoa học'
                            />
                        </Grid>
                        <Grid xs={2}>
                            <InputField
                                form={form}
                                name='division.reference'
                                label='TLTK số'
                            />
                        </Grid>
                    </Grid>
                    <Grid xs={12} container>
                        <Grid xs={5}>
                            <InputField
                                form={form}
                                name='class.name'
                                label='Thuộc lớp'
                            />
                        </Grid>
                        <Grid xs={5}>
                            <InputField
                                form={form}
                                name='class.nomenclature'
                                label='Danh pháp khoa học'
                            />
                        </Grid>
                        <Grid xs={2}>
                            <InputField
                                form={form}
                                name='class.reference'
                                label='TLTK số'
                            />
                        </Grid>
                    </Grid>
                    <Grid xs={12} container>
                        <Grid xs={5}>
                            <InputField
                                form={form}
                                name='order.name'
                                label='Thuộc bộ'
                            />
                        </Grid>
                        <Grid xs={5}>
                            <InputField
                                form={form}
                                name='order.nomenclature'
                                label='Danh pháp khoa học'
                            />
                        </Grid>
                        <Grid xs={2}>
                            <InputField
                                form={form}
                                name='order.reference'
                                label='TLTK số'
                            />
                        </Grid>
                    </Grid>
                    <Grid xs={12} container>
                        <Grid xs={5}>
                            <InputField
                                form={form}
                                name='family.name'
                                label='Thuộc họ'
                            />
                        </Grid>
                        <Grid xs={5}>
                            <InputField
                                form={form}
                                name='family.nomenclature'
                                label='Danh pháp khoa học'
                            />
                        </Grid>
                        <Grid xs={2}>
                            <InputField
                                form={form}
                                name='family.reference'
                                label='TLTK số'
                            />
                        </Grid>
                    </Grid>
                    <Grid xs={12} container>
                        <Grid xs={5}>
                            <InputField
                                form={form}
                                name='genus.name'
                                label='Thuộc chi'
                            />
                        </Grid>
                        <Grid xs={5}>
                            <InputField
                                form={form}
                                name='genus.nomenclature'
                                label='Danh pháp khoa học'
                            />
                        </Grid>
                        <Grid xs={2}>
                            <InputField
                                form={form}
                                name='genus.reference'
                                label='TLTK số'
                            />
                        </Grid>
                    </Grid>
                    <Grid xs={12} container>
                        <Grid xs={10}>
                            <InputField
                                form={form}
                                name='species.name'
                                label='Loài'
                            />
                        </Grid>
                        <Grid xs={2}>
                            <InputField
                                form={form}
                                name='species.reference'
                                label='TLTK số'
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default IntroductionForm;
