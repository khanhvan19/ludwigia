import { Outlet } from 'react-router';
import { Fragment } from 'react';
import ClientHeader from './Header';

function ClientLayout() {
    return (
        <Fragment>
            <ClientHeader />
            <main>
                <Outlet />
            </main>
        </Fragment>
    )
}

export default ClientLayout;
