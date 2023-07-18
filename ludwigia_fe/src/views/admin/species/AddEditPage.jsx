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
    { label: 'Trang chủ', link: '/admin/' },
    { label: 'Loài thực vật', link: '/admin/species' }
];

function AddEditSpecies() {
    const navigate = useNavigate();
    const { state } = useLocation();

    const initValue = {
        // General Infomation
        genus_ref: state?.genus_ref || '',
        sci_name: state?.sci_name || '',
        author: state?.vie_name || '',
        debut_year: state?.species || '',
        family_description: state?.family_description || '',
        avatar: state?.avatar?.link || '',
        other_name: state?.othername || [{ name: '', reference: '' }],
        vie_name: state?.vie_name || [{ name: '', reference: '' }],
        // Takhtanjan System
        kingdom: state?.kingdom || { name: '', nomenclature: '', reference: '' },
        division: state?.division || { name: '', nomenclature: '', reference: '' },
        class: state?.class || { name: '', nomenclature: '', reference: '' },
        order: state?.order || { name: '', nomenclature: '', reference: '' },
        family: state?.family || { name: '', nomenclature: '', reference: '' },
        genus: state?.genus || { name: '', nomenclature: '', reference: '' },
        species: state?.species || { name: '', reference: '' },
        // Description
        description: {
            content: state?.description?.content || '',
            images: state?.description?.images?.link || [{ link: '' }]
        },
        // Microsurgery
        microsurgery: [{
            image: state?.microsurgery?.image?.link || '',
            caption: state?.microsurgery?.caption || '',
            explains: state?.microsurgery?.explains || [{ content: '' }]
        }],
        // Distribution
        distribution: {
            content: state?.distribution?.content || '',
            image: state?.distribution?.image?.link || ''
        },
        // Phytochemical
        phytochemical: [{
            bio_active: state?.bio_active || '',
            bio_reference: state?.bio_reference || '',
            chemical_group: state?.chemical_group || '',
            segment: state?.segment || '',
            physical_properties: state?.physical_properties || '',
            spectrum: state?.spectrum || [],
            chemical_structure: state?.chemical_structure || '',
            pharma_effect: state?.pharma_effect || ''
        }],
        // Benefits
        benefit: state?.benefit || '',
        // References
        references: [{
            content: state?.reference?.content || '',
            link: state?.reference?.link || '',
            language: state?.reference?.language || 'en'
        }]
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
        family_description: Yup.string().trim()
            .required('Vui lòng không để trống trường này!'),
        avatar: Yup.mixed()
            .test('required', 'Vui lòng chọn hình ảnh tải lên!', value => {
                return value && value.length;
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
        // Validate Takhtanjan System
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
        class: Yup.object().shape({
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
            name: Yup.string().trim()
                .required('Vui lòng không để trống trường này!'),
            nomenclature: Yup.string().trim()
                .required('Vui lòng không để trống trường này!')
        }),
        // Validate Description
        description: Yup.object().shape({
            content: Yup.string().trim()
                .required('Vui lòng không để trống trường này!'),
            images: Yup.array()
                .of(Yup.object().shape({
                    link: Yup.mixed()
                        .test('required', 'Vui lòng chọn hình ảnh tải lên!', value => {
                            return value && value.length;
                        })
                }))
        }),
        // Validation Microsurgery
        microsurgery: Yup.array()
            .of(Yup.object().shape({
                image: Yup.mixed()
                    .test('required', 'Vui lòng chọn hình ảnh tải lên!', value => {
                        return value && value.length;
                    }),
                caption: Yup.string().trim()
                    .required('Vui lòng không để trống trường này!'),
                explains: Yup.array()
                    .of(Yup.object().shape({
                        content: Yup.string().trim()
                            .required('Vui lòng không để trống trường này!'),
                    }))
            })),
        // Validation Distribution
        distribution: Yup.object().shape({
            content: Yup.string().trim()
                .required('Vui lòng không để trống trường này!'),
            image: Yup.mixed()
                .test('required', 'Vui lòng chọn hình ảnh tải lên!', value => {
                    return value && value.length;
                })
        }),
        // Validate Phytochemical
        phytochemical: Yup.array()
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
                        return value && value.length;
                    }),
                pharma_effect: Yup.string().trim().trim()
            })),
        // Validate Benefits
        benefit: Yup.string().trim()
            .required('Vui lòng không để trống trường này!'),
        // Validate References
        references: Yup.array()
            .of(Yup.object().shape({
                content: Yup.string().trim()
                    .required('Vui lòng không để trống trường này!'),
                link: Yup.string().trim()
                    .required('Vui lòng không để trống trường này!'),
                language: Yup.string().trim()
                    .required('Vui lòng chọn một trong các lựa chọn!')

            }))
    })

    return (
        <Fragment>
            <Box className="flex-between" alignItems="flex-end">
                <Box>
                    <Typography variant="h5" fontWeight="700" gutterBottom>
                        {(state == null) ? 'Thêm Loài thực vật' : 'Chỉnh sửa Loài thực vật'}
                    </Typography>
                    <RouterBreadcrumbs
                        prevLink={BREADCRUMBS}
                        homeIcon={<Speed />}
                        currentPage={(state == null)
                            ? 'Thêm Loài thực vật'
                            : 'Chỉnh sửa Loài thực vật'
                        }
                    />
                </Box>
                <Box mb={1}>
                    <Button
                        color='cancel'
                        variant="contained"
                        startIcon={<ArrowBackOutlined />}
                        onClick={() => navigate('/admin/species')}
                    >
                        Trở lại
                    </Button>
                </Box>
            </Box>
            <Paper sx={{ mt: 3, p: 2, pt: 3 }} elevation={4}>
                <AddEditForm
                    initValue={initValue}
                    validateSchema={validateSchema}
                    editItemId={state}
                />
            </Paper>
        </Fragment>
    );
}

export default AddEditSpecies;