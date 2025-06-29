import React from 'react';
import { Outlet } from 'react-router';
import authImg from '../assets/authImage.png'
import ProfastLogo from '../pages/shared/ProfastLogo/ProfastLogo';

const AuthLayout = () => {
  return (
    <div className="px-6 py-12 lg:px-12 max-w-7xl mx-auto min-h-screen">

      <ProfastLogo></ProfastLogo>
      <div className="hero-content flex-col lg:flex-row-reverse ">
        <div className='flex-1 bg-[#FAFDF0]'>
          <img
            src={authImg}
            className=" rounded-lg "
          />
        </div>
        <div className='flex-1'>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;