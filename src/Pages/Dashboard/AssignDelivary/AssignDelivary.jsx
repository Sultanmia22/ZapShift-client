import React from 'react';
import useAuth from '../../../Hook/useAuth';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AssignDelivary = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure();

    const { data: percels = [], refetch } = useQuery({
        queryKey: ['percels', user?.email, ['driver_Assigned']],
        queryFn: async () => {
            const res = await axiosSecure.get(`percel-riders?riderEmail=${user?.email}&delivaryStatus=driver_Assigned`)
            return res.data;
        }
    })

    //! Handle Accept and Reject function 
    const handleDelivaryRequest = (id, statusInfo, type) => {
        axiosSecure.patch(`/percels-request/${id}`, statusInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Your ${type} has been successfully`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    //! Handle accept delivary 
    const handleAcceptDelivary = (percel) => {
        const trackingId = percel.trackingId
        const statusInfo = { delivaryStatus: 'rider_arriving',trackingId}
        
        const type = 'accept'
        handleDelivaryRequest(percel._id, statusInfo, type)
    }

    //! Handle rejected delivary 
    const handleRejectDelivary = (percel) => {
         const trackingId = percel.trackingId
        const statusInfo = { delivaryStatus: 'rider-rejected',trackingId }
        const type = 'reject'
        handleDelivaryRequest(percel._id, statusInfo, type)
    }

    //! Handle pick up 
    const handlePickUp = (percel) => {
         const trackingId = percel.trackingId
        const statusInfo = { delivaryStatus: 'percel-pick-up',trackingId }
        const type = 'pick-up'
        handleDelivaryRequest(percel._id, statusInfo, type)
    }
    //! Handle Delivered
    const handleDelivared = (percel) => {
        const trackingId = percel.trackingId
        const type = 'Delivered'
        const riderEmail = percel.riderEmail
        const statusInfo = { delivaryStatus: 'percel-Delivered', riderEmail,trackingId}
        handleDelivaryRequest(percel._id, statusInfo, type,)
    }

    return (
        <div>
            <h2 className="text-4xl font-semibold px-10 py-5">Percel Pending Pickup: {percels.length} </h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>District</th>
                            <th>Action</th>
                            <th>Others Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            percels.map((percel, index) =>
                                <tr>
                                    <th>{index + 1}</th>
                                    <td>{percel.percelName}</td>
                                    <td>{percel.cost}</td>
                                    <td>{percel.senderDistrict}</td>
                                    <td className='flex items-center gap-2'>
                                        {
                                            percel.delivaryStatus === 'driver_Assigned' ? <>
                                                <button onClick={() => handleAcceptDelivary(percel)} className='btn btn-sm btn-primary text-secondary'> Accept </button>
                                                <button onClick={() => handleRejectDelivary(percel)} className='btn btn-sm btn-secondary'> Reject </button>
                                            </> :

                                                <span className='text-green-400'>Accept</span>
                                        }
                                    </td>
                                    <td className='space-x-2'>
                                        {
                                            percel.delivaryStatus === 'percel-pick-up' ? <span>Percel pickup</span> : <button onClick={() => handlePickUp(percel)} className='btn btn-sm btn-primary text-secondary'> Mark as Pick Up </button>
                                        }
                                        <button onClick={() => handleDelivared(percel)} className='btn btn-sm btn-primary text-secondary'> Mark as Delivared </button>
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

export default AssignDelivary;