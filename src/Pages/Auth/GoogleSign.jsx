import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../Hook/useAuth';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import { useNavigate } from 'react-router';

const GoogleSign = () => {
    const { googleSignIn } = useAuth()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(res => {
                const user = res.user;

                //! Creat User and store data in database 
                const userInfo = {
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                }

                axiosSecure.post('/users', userInfo)
                    .then(res => {
                        // console.log('user data has been stored', res.data)
                    })
            })
            .catch(er => {
                const error = er.message;

            })

            navigate('/')
    }

    return (
        <div>
            <button onClick={handleGoogleSignIn} className='btn btn-secondary w-full'> <FcGoogle size={24} /> Continue with Google </button>
        </div>
    );
};

export default GoogleSign;