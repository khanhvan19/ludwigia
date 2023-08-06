import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArticleOutlined from '@mui/icons-material/ArticleOutlined';

import TextAreaField from '~/components/ui/inputField/textAreaField';

function BenifitsForm({ form, readOnlyMode }) {
    return (
        <Box mt={3}>
            <Box display='flex' alignItems='center' mb={2} >
                <ArticleOutlined sx={{ mr: .75 }} fontSize='small' />
                <Typography fontSize={15} fontWeight={500} fontStyle='italic'>
                    Mô tả công dụng:
                </Typography>
            </Box>
            <TextAreaField
                form={form}
                name='benefits'
                minHeight={280}
                readOnly={readOnlyMode}
            />
        </Box>
    );
}

export default BenifitsForm;