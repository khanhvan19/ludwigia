import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Box from '@mui/material/Box';

import HeadName from '~/components/ui/HeadName';
import Intro from './content/Intro';
import Description from './content/Description';
import Microsurgery from './content/Microsurgery';
import Distribution from './content/Distribution';
import Phytochemicals from './content/Phytochemicals';
import Benifits from './content/Benefits';
import References from './content/References';
import axiosPublic from '~/utils/axiosPublic';
import SpeciesSidebar from './Sidebar';

function SpeciesPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [fetching, setFetching] = useState(true);
    const [species, setSpecies] = useState(null)

    useEffect(() => {
        const controler = new AbortController();

        axiosPublic
            .get(`/species/${id}`)
            .then(res => {
                setSpecies(res)
                setFetching(false)
            })
            .catch(() => navigate('/internal-server-error'));

        return () => {
            controler.abort();
        }
    }, [id, navigate])

    return (
        <Box>
            {species !== null && (
                <Fragment>
                    <HeadName
                        title={species.short_name}
                        subTitle={species.sci_name}
                        image={species.avatar.fileUrl}
                    />
                    <Box display='flex'>
                        <SpeciesSidebar />
                        <Box p={3}>
                            <Box id='intro' pb={8}><Intro data={species} /></Box>
                            <Box id='description' pb={8}><Description data={species} /></Box>
                            <Box id='microsurgery' pb={8}><Microsurgery data={species} /></Box>
                            <Box id='distribution' pb={8}><Distribution data={species} /></Box>
                            <Box id='phytochemicals' pb={8}><Phytochemicals data={species} /></Box>
                            <Box id='used-parts' pb={8}><Benifits data={species} /></Box>
                            <Box id='references' pb={8}><References data={species} /></Box>
                        </Box>
                    </Box>
                </Fragment>
            )}
        </Box>
    );
}

export default SpeciesPage;