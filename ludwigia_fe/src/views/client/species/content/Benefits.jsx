import Box from '@mui/material/Box';
import HeadContent from './HeadContent';
import StringHasQuote from '~/components/ui/StringHasQuote';

function Benefits({ data }) {
    return (
        <Box>
            <HeadContent>Bộ phận dùng và công dụng</HeadContent>
            <Box
                textAlign='justify'
                sx={{
                    textIndent: '40px',
                    '& p': { mb: 1 }
                }}
            >
                <StringHasQuote
                    htmlStr={data.benefits}
                    references={data.references}
                />
            </Box>
        </Box>
    );
}

export default Benefits;