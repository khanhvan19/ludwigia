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
                            <Route path='/genus/:id' element={<Views.GenusPage />} />
                            <Route path='/species/:id' element={<Views.SpeciesPage />} />
                        </Route>

                        <Route element={<AdminLayout />}>
                            <Route path='/administrator/' element={<Views.Dashboard />} />
                            <Route path='/administrator/user' element={<Views.UserManager />} />
                            <Route path='/administrator/genus' element={<Views.GenusManager />} />
                            <Route path='/administrator/species' element={<Views.SpeciesManager />} />
                            <Route path='/administrator/species/:id' element={<Views.AddEditSpecies />} />
                            <Route path='/administrator/species/add' element={<Views.AddEditSpecies />} />
                            <Route path='/administrator/species/edit/:id' element={<Views.AddEditSpecies />} />
                        </Route>

                        <Route path='/administrator/login' element={<Views.Login />} />
                        <Route path='/administrator/reset_password/:id/:token' element={<Views.ResetPassword />} />
                        <Route path='/administrator/reset_password' element={<Views.ResetPassword />} />

                        <Route path='/internal-server-error' element={<Views.Error500 />} />
                        <Route path='*' element={<Views.NotFound />} />
                    </Routes>
                </BrowserRouter>
                <ToastContainer />
            </CssVarsProvider>
        </div>
    );
}

export default App;
