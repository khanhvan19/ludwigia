import { Fragment } from 'react';
import { Typography } from '@mui/material';

function ScienceName({ name }) {

    const findIdxSecondSpace = () => {
        const space1 = name.indexOf(' ');
        return name.indexOf(' ', space1 + 1);
    }

    return (
        <Fragment>
            <Typography component='i'>
                {name.substring(0, findIdxSecondSpace())}
            </Typography>
            <Typography component='span' pl={.25}>
                {name.substring(findIdxSecondSpace())}
            </Typography>
        </Fragment>
    );
}

export default ScienceName;