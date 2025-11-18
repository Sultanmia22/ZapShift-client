import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../Hook/useAuth';

const GoogleSign = () => {
 const {googleSignIn} = useAuth()

 const handleGoogleSignIn = () => {
    googleSignIn()
    .then(res => {
        const user = res.user;
    })
    .catch(er => {
        const error = er.message;
        
    })
 }

    return (
        <div>
              <button onClick={handleGoogleSignIn} className='btn btn-secondary w-full'> <FcGoogle size={24} /> Continue with Google </button>
        </div>
    );
};

export default GoogleSign;