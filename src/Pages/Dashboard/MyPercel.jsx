
import React from 'react';
import useAuth from '../../Hook/useAuth';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';


const MyPercel = () => {

    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()

    const {data} = useQuery({
        queryKey:['mypercels',user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/percels?email=${user?.email}`)
            return res.data
        }
    })

    console.log(data)

    return (
        <div>
            All OF My Percel
        </div>
    );
};

export default MyPercel;