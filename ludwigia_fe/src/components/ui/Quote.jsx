import { Link } from 'react-router-dom';
import { Link as LinkScroll } from 'react-scroll'
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';

const QuoteContainer = ({ children, quote, quoteLink }) => {
    if (quoteLink !== '') {
        return (
            <Link to={quoteLink} target='_blank'>
                {children}
            </Link>
        )
    } else {
        return (
            <LinkScroll to={`reference-${quote}`} spy={true} smooth={true} offset={-80} duration={500}>
                {children}
            </LinkScroll>
        )
    }
}

function Quote({ quote, quoteLink }) {
    return (
        <QuoteContainer quote={quote} quoteLink={quoteLink}>
            <Typography
                component='span' ml={.5}
                color={blue[900]} fontFamily='var(--poppins-font)'
                sx={{
                    cursor: 'pointer',
                    '&:hover': { color: blue[400] }
                }}
            >
                {`[${quote}]`}
            </Typography>
        </QuoteContainer>
    );
}

export default Quote;