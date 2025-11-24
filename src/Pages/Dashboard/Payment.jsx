import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Payment = () => {

    const {percelID} = useParams()
    const axiosSecure = useAxiosSecure()

    const {data: percels,isLoading,error,refetch} = useQuery({
        queryKey:['percels',percelID],
        queryFn:async () => {
            const res = await axiosSecure.get(`/percels/${percelID}`)
            return res.data
        }
    })

    const handlePayment = async() => {
        const paymentInfo = {
            cost:percels.cost,
            percelId: percels._id,
            senderEmail:percels.senderEmail,
            percelName:percels.percelName,
        }

        const res = axiosSecure.post('/create-checkout-session',paymentInfo)
        window.location.href = (await res).data.url;
    }

   

    if(isLoading){
        return <div className='text-4xl font-bold'>
            <p>Loading...</p>
        </div>
    }

    return (
        <div className='text-center '>
            <h2 className='text-4xl font-bold'> Click To Payment </h2>
            <div className='flex justify-center py-7'>
                <button onClick={handlePayment} className='btn btn-primary text-black'>Payment</button>
            </div>
        </div>
    );
};

export default Payment;