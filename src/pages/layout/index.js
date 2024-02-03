import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../components/index.ts';

const Layout = () => {
    return (
        <div className='main-app'>
            <Header />
            <section className='page-body'><Outlet /></section>
        </div>
    );
};

export default Layout;
