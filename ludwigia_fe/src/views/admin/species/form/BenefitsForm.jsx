import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArticleOutlined from '@mui/icons-material/ArticleOutlined';

import TextAreaField from '~/components/ui/inputField/textAreaField';

function BenifitsForm({ form }) {
    return (
        <Box mt={3}>
            <Box display='flex' alignItems='center' mb={2} >
                <ArticleOutlined sx={{ mr: .75 }} />
                <Typography fontWeight={600} fontStyle='italic'>Mô tả công dụng:</Typography>
            </Box>
            <TextAreaField
                form={form}
                name='benefit'
                minHeight={280}
            />
        </Box>
    );
}

export default BenifitsForm;