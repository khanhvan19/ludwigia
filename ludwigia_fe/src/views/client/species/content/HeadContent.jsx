import Typography from '@mui/material/Typography';

function HeadContent({ children }) {
    return (
        <Typography
            variant='h4'
            color='#ffffff'
            bgcolor='background.accent1'
            textAlign='center'
            fontWeight={600}
            mx={-3} mb={4} py={0.75}
        >
            {children}
        </Typography>
    );
}

export default HeadContent;