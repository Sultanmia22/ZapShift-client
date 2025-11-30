import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000',
})

const useAxiosSecure = () => {

    const { user, signOutUser } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {

        //! Interceotirs request 
        const reqinterceptors = axiosSecure.interceptors.request.use(function (config) {
            config.headers.Authorization = `Bearer ${user?.accessToken}`
            return config
        })

        //! interceptors response 
        const resInterceptors = axiosSecure.interceptors.response.use(
            (response) => {
                return response
            },

            (err) => {
                // console.log(err)
                const errorStatusCode = err.status

                if (errorStatusCode === 401 || errorStatusCode === 403) {
                    signOutUser()
                        .then(() => {
                            navigate('/login')
                        })
                }

                return Promise.reject(err)
            }
        )

        return () => {
            axiosSecure.interceptors.request.eject(reqinterceptors)
            axiosSecure.interceptors.response.eject(resInterceptors)
        }

    }, [user, signOutUser, navigate])

    return axiosSecure
};

export default useAxiosSecure;