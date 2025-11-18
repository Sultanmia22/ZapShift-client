import React from 'react';
import Logo from '../Components/Logo/Logo';
import { Outlet } from 'react-router';
import authImage from '../assets/authImage.png'

const AuthLayouts = () => {
    return (
        <div className='max-w-7xl mx-auto '>
            <Logo/>

            <div className='flex'>
                <div className='flex-1'> <Outlet/> </div>
                <div className='flex-1 bg-[#FAFDF0] min-h-screen justify-center items-center flex'> <img src={authImage} alt="" /> </div>
            </div>
        </div>
    );
};

export default AuthLayouts;