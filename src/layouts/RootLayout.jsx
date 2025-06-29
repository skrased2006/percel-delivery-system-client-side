import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/shared/Navbar/Navbar';
import Footer from '../pages/shared/Footer/Footer';

const RootLayout = () => {
  return (
    <div>

      <header className='py-4'>
        <Navbar></Navbar>
      </header>
      <Outlet></Outlet>
      <Footer></Footer>

    </div>
  );
};

export default RootLayout;