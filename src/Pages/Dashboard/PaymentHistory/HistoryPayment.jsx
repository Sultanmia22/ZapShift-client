import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../Hook/useAuth';
import useAxiosSecure from '../../../Hook/useAxiosSecure';

const HistoryPayment = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()


    const { data: history, isLoading, error } = useQuery({
        queryKey: ['payment-history', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment-history?email=${user?.email}`)
            return res.data
        }
        
    })

    console.log(history)

    if (isLoading) {
        return <div className='text-center'> <p>Loading...</p> </div>
    }

    return (
        <div className='py-4'>
            <h2 className='text-4xl font-semibold text-secondary'> Total History Available ({history?.length}) </h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Tracking ID</th>
                            <th> Transaction ID </th>
                            <th> Date  </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            history.map((data, index) =>
                                <tr key={data._id}>
                                    <th>{index + 1}</th>
                                    <td>{data.percelName}</td>
                                    <td>{data.amount}USD</td>
                                    <td>{data.trackingId}</td>
                                    <td>{data.transactionId}</td>
                                    <td>{data.paidAt}</td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HistoryPayment;