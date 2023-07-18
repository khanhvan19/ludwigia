import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import theme from './theme';
import * as Views from '~/views';
import ClientLayout from '~/views/client/Layout';
import AdminLayout from '~/views/admin/Layout';
import { ToastContainer } from 'react-toastify';

function App() {
    return (
        <div className='App'>
            <CssVarsProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Views.HomePage />} />

                        <Route element={<ClientLayout />}>
                            <Route path='/introduction' element={<Views.IntroPage />} />
                            <Route path='/:genus_slug' element={<Views.GenusPage />} />
                            <Route path='/:genus_slug/:species_slug' element={<Views.SpeciesPage />} />
                        </Route>

                        <Route element={<AdminLayout />}>
                            <Route path='/admin/' element={<Views.Dashboard />} />
                            <Route path='/admin/genus' element={<Views.GenusManager />} />
                            <Route path='/admin/species' element={<Views.SpeciesManager />} />
                            <Route path='/admin/species/add' element={<Views.AddEditSpecies />} />
                            <Route path='/admin/species/edit' element={<Views.AddEditSpecies />} />
                        </Route>

                        <Route path='/admin/login' element={<Views.Login />} />

                        <Route path='*' element={<Views.NotFound />} />
                    </Routes>
                </BrowserRouter>
                <ToastContainer />
            </CssVarsProvider>
        </div>
    );
}

export default App;
