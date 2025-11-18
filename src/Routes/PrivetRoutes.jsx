import React from 'react';
import useAuth from '../Hook/useAuth';
import { Navigate } from 'react-router';

const PrivetRoutes = ({children}) => {
    const {user,loading} = useAuth() 

    if(loading){
        return <div className='flex justify-center items-center min-h-screen'>
            <span className="loading loading-dots loading-xl"></span>
        </div>
    }

    else if(user){
        return children
    }

   return <Navigate to='/login'></Navigate>
};

export default PrivetRoutes;