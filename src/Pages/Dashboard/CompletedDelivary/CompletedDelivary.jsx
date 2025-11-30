import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../Hook/useAuth';
import useAxiosSecure from '../../../Hook/useAxiosSecure';

const CompletedDelivary = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: percels = [], } = useQuery({
        queryKey: ['percel'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/percel-delivered?riderEmail=${user?.email}&delivaryStatus=percel-Delivered`)
            return res.data
        }
    })

    const calculatePayout = percel => {
        if(percel.senderDistrict === percel.receiverDistrict){
            return percel.cost * 0.8
        }
        else {
            return percel.cost * 0.6
        }
    }
    

return (
    <div>
        <h2> Completed Delivery: {percels.length} </h2>

        <div className="overflow-x-auto">
            <table className="table table-zebra">
                {/* head */}
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>CreatedAt</th>
                        <th>Pickup District</th>
                        <th>Cost</th>
                        <th>payout</th>
                        <th> Action </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        percels.map((percel, index) =>
                            <tr key={percel._id}>
                                <th>{index + 1}</th>
                                <td>{percel.percelName}</td>
                                <td>{percel.createdAt}</td>
                                <td>{percel.senderDistrict}</td>
                                <td>{percel.cost}</td>
                                <td>{calculatePayout(percel)}</td>
                                <td>
                                    <button className='btn btn-sm btn-primary text-secondary'>Cash Out</button>
                                </td>
                            </tr>

                        )
                    }

                </tbody>
            </table>
        </div>
    </div>
);
};

export default CompletedDelivary;