import Box from '@mui/material/Box';
import HeadContent from './HeadContent';
import StringHasQuote from '~/components/ui/StringHasQuote';

function Distribution({ data }) {

    return (
        <Box>
            <HeadContent>Phân bố sinh thái</HeadContent>
            <Box
                textAlign='justify'
                sx={{
                    textIndent: '40px',
                    '& p': { mb: 1 }
                }}
            >
                <StringHasQuote
                    htmlStr={data.distribution.content}
                    references={data.references}
                />
            </Box>
            {data.distribution.image && (
                <Box
                    component='img'
                    src={data.distribution.image.fileUrl} alt=''
                    width='100%' mt={3}
                />
            )}
        </Box>
    );
}

export default Distribution;
