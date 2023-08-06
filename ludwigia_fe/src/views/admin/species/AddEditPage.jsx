import { Fragment } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

import Speed from '@mui/icons-material/Speed';
import ArrowBackOutlined from '@mui/icons-material/ArrowBackOutlined';

import RouterBreadcrumbs from '~/components/ui/Breadcrumbs';
import AddEditForm from './AddEditForm';

const BREADCRUMBS = [
    { label: 'Trang chủ', link: '/administrator/' },
    { label: 'Loài thực vật', link: '/administrator/species' }
];

function AddEditSpecies() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const currentData = state?.data;
    const mode = state?.mode;

    const initValue = {
        // General Infomation
        genus_ref: currentData?.genus_ref._id || '',
        sci_name: currentData?.sci_name || '',
        author: currentData?.author || '',
        debut_year: currentData?.debut_year || '',
        avatar: currentData?.avatar || '',
        other_name: currentData?.other_name || [{ name: '', reference: '' }],
        vie_name: currentData?.vie_name || [{ name: '', reference: '' }],
        family_description: currentData?.family_description || '',
        // Takhtanjan System
        takhtajan_system: {
            kingdom: currentData?.takhtajan_system?.kingdom || { name: '', nomenclature: '', reference: '' },
            division: currentData?.takhtajan_system?.division || { name: '', nomenclature: '', reference: '' },
            layer: currentData?.takhtajan_system?.layer || { name: '', nomenclature: '', reference: '' },
            order: currentData?.takhtajan_system?.order || { name: '', nomenclature: '', reference: '' },
            family: currentData?.takhtajan_system?.family || { name: '', nomenclature: '', reference: '' },
            genus: currentData?.takhtajan_system?.genus || { name: '', nomenclature: '', reference: '' },
            species: currentData?.takhtajan_system?.species || { nomenclature: '', reference: '' }
        },
        // Description
        description_content: currentData?.description?.content || '',
        description_images: currentData?.description?.images || [''],
        // Microsurgery
        microsurgerys: currentData?.microsurgerys || [{ image: '', caption: '', explains: [''] }],
        // Distribution
        distribution_content: currentData?.distribution?.content || '',
        distribution_image: currentData?.distribution?.image || '',
        // Phytochemical
        phytochemicals: currentData?.phytochemicals || [{
            bio_active: '',
            bio_reference: '',
            chemical_group: '',
            segment: '',
            physical_properties: '',
            spectrum: [],
            chemical_structure: '',
            pharma_effect: ''
        }],
        // Benefits
        benefits: currentData?.benefits || '',
        // References
        references: currentData?.references || [{ content: '', link: '' }]
    }

    const validateSchema = Yup.object().shape({
        // Validate General Infomation
        genus_ref: Yup.string().trim()
            .required('Vui lòng chọn một trong các lựa chọn!'),
        sci_name: Yup.string().trim()
            .required('Vui lòng không để trống trường này!'),
        author: Yup.string().trim()
            .required('Vui lòng không để trống trường này!'),
        debut_year: Yup.string().trim()
            .max(4, 'Vui lòng nhập năm đúng định dạng!'),
        avatar: Yup.mixed()
            .test('required', 'Vui lòng chọn hình ảnh tải lên!', value => {
                if (typeof value === 'object' && value.fileUrl) return true;
                return value && value.length;
            })
            .test('fileSize', 'Dung lượng hình ảnh vượt quá 5 MB!', value => {
                if (typeof value === 'object' && value.fileUrl) return true;
                return value && (value[0].size <= 5 * 1024 * 1024)
            }),
        other_name: Yup.array()
            .of(Yup.object().shape({
                name: Yup.string().trim()
                    .required('Vui lòng không để trống trường này!')
            })),
        vie_name: Yup.array()
            .of(Yup.object().shape({
                name: Yup.string().trim()
                    .required('Vui lòng không để trống trường này!')
            })),
        family_description: Yup.string().trim()
            .required('Vui lòng không để trống trường này!'),
        // Validate Takhtanjan System
        takhtajan_system: Yup.object().shape({
            kingdom: Yup.object().shape({
                name: Yup.string().trim()
                    .required('Vui lòng không để trống trường này!'),
                nomenclature: Yup.string().trim()
                    .required('Vui lòng không để trống trường này!')
            }),
            division: Yup.object().shape({
                name: Yup.string().trim()
                    .required('Vui lòng không để trống trường này!'),
                nomenclature: Yup.string().trim()
                    .required('Vui lòng không để trống trường này!')
            }),
            layer: Yup.object().shape({
                name: Yup.string().trim()
                    .required('Vui lòng không để trống trường này!'),
                nomenclature: Yup.string().trim()
                    .required('Vui lòng không để trống trường này!')
            }),
            order: Yup.object().shape({
                name: Yup.string().trim()
                    .required('Vui lòng không để trống trường này!'),
                nomenclature: Yup.string().trim()
                    .required('Vui lòng không để trống trường này!')
            }),
            family: Yup.object().shape({
                name: Yup.string().trim()
                    .required('Vui lòng không để trống trường này!'),
                nomenclature: Yup.string().trim()
                    .required('Vui lòng không để trống trường này!')
            }),
            genus: Yup.object().shape({
                name: Yup.string().trim()
                    .required('Vui lòng không để trống trường này!'),
                nomenclature: Yup.string().trim()
                    .required('Vui lòng không để trống trường này!')
            }),
            species: Yup.object().shape({
                nomenclature: Yup.string().trim()
                    .required('Vui lòng không để trống trường này!')
            })
        }),
        // Validate Description
        description_content: Yup.string().trim()
            .required('Vui lòng không để trống trường này!'),
        description_images: Yup.array()
            .of(Yup.mixed()
                .test('required', 'Vui lòng chọn hình ảnh tải lên!', value => {
                    if (typeof value === 'object' && value.fileUrl) return true;
                    return value && value.length;
                })
                .test('fileSize', 'Dung lượng hình ảnh vượt quá 5 MB!', value => {
                    if (typeof value === 'object' && value.fileUrl) return true;
                    return value && (value[0].size <= 5 * 1024 * 1024)
                })
            ),
        // Validation Microsurgery
        microsurgerys: Yup.array()
            .of(Yup.object().shape({
                image: Yup.mixed()
                    .test('required', 'Vui lòng chọn hình ảnh tải lên!', value => {
                        if (typeof value === 'object' && value.fileUrl) return true;
                        return value && value.length;
                    })
                    .test('fileSize', 'Dung lượng hình ảnh vượt quá 5 MB!', value => {
                        if (typeof value === 'object' && value.fileUrl) return true;
                        return value && (value[0].size <= 5 * 1024 * 1024)
                    }),
                caption: Yup.string().trim()
                    .required('Vui lòng không để trống trường này!'),
            })),
        // Validation Distribution
        distribution_content: Yup.string().trim()
            .required('Vui lòng không để trống trường này!'),
        distribution_image: Yup.mixed()
            .test('required', 'Vui lòng chọn hình ảnh tải lên!', value => {
                if (typeof value === 'object' && value.fileUrl) return true;
                return value && value.length;
            })
            .test('fileSize', 'Dung lượng hình ảnh vượt quá 5 MB!', value => {
                if (typeof value === 'object' && value.fileUrl) return true;
                return value && (value[0].size <= 5 * 1024 * 1024)
            }),
        // Validate Phytochemical
        phytochemicals: Yup.array()
            .of(Yup.object().shape({
                bio_active: Yup.string().trim()
                    .required('Vui lòng không để trống trường này!'),
                chemical_group: Yup.string().trim(),
                segment: Yup.string().trim(),
                physical_properties: Yup.string().trim()
                    .required('Vui lòng không để trống trường này!'),
                spectrum: Yup.array()
                    .of(Yup.string().trim())
                    .min(1, 'Vui lòng không để trống trường này!'),
                chemical_structure: Yup.mixed()
                    .test('required', 'Vui lòng chọn hình ảnh tải lên!', value => {
                        if (typeof value === 'object' && value.fileUrl) return true;
                        return value && value.length;
                    })
                    .test('fileSize', 'Dung lượng hình ảnh vượt quá 5 MB!', value => {
                        if (typeof value === 'object' && value.fileUrl) return true;
                        return value && (value[0].size <= 5 * 1024 * 1024)
                    }),
                pharma_effect: Yup.string().trim().trim()
            })),
        // Validate Benefits
        benefits: Yup.string().trim()
            .required('Vui lòng không để trống trường này!'),
        // Validate References
        references: Yup.array()
            .of(Yup.object().shape({
                content: Yup.string().trim()
                    .required('Vui lòng không để trống trường này!'),
                link: Yup.string().trim()
                    .url('Vui lòng nhập đúng định dạng một URL!')
            }))
    })

    return (
        <Fragment>
            <Box className="flex-between" alignItems="flex-end">
                <Box>
                    <Typography variant="h5" fontWeight="700" gutterBottom>
                        {(currentData == null)
                            ? 'Thêm Loài thực vật'
                            : (mode === 'edit')
                                ? 'Chỉnh sửa Loài thực vật'
                                : 'Chi tiết Loài thực vật'
                        }
                    </Typography>
                    <RouterBreadcrumbs
                        prevLink={BREADCRUMBS}
                        homeIcon={<Speed />}
                        currentPage={(currentData == null)
                            ? 'Thêm Loài thực vật'
                            : (mode === 'edit')
                                ? 'Chỉnh sửa Loài thực vật'
                                : 'Chi tiết Loài thực vật'
                        }
                    />
                </Box>
                <Box mb={1}>
                    <Button
                        color='cancel'
                        variant="contained"
                        startIcon={<ArrowBackOutlined />}
                        onClick={() => navigate('/administrator/species')}
                    >
                        Trở lại
                    </Button>
                </Box>
            </Box>
            <Paper sx={{ mt: 3, p: 2, pt: 3 }} elevation={4}>
                <AddEditForm
                    initValue={initValue}
                    validateSchema={validateSchema}
                    editItemId={currentData?._id}
                    readOnlyMode={mode === 'readOnly'}
                />
            </Paper>
        </Fragment>
    );
}

export default AddEditSpecies;