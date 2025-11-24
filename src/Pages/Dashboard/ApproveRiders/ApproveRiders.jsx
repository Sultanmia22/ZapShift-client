import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hook/useAxiosSecure';

import { FaTrashAlt, FaUserCheck } from 'react-icons/fa';
import { IoPersonRemoveSharp } from 'react-icons/io5';
import Swal from 'sweetalert2';

const ApproveRiders = () => {

    const axiosSecure = useAxiosSecure()

    const { data: riders = [],refetch } = useQuery({
        queryKey: ['riders', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders');
            return res.data
        }
    })

    
    const handleManageStatus = (rider,status) => {
        const updateInfo = {
            status: status,
            email : rider.email
        }

        axiosSecure.patch(`/riders/${rider._id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Successfully your ${status} action`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }

    //! handle approval 
    const handleApproval = (rider) => {
        handleManageStatus(rider,'approved')
    }

    //! handle rejection 
    const handleRejection = (rider) => {
        handleManageStatus(rider,'rejected')
    }


    //! handle delete rider 
    const handleDeleteRider = (id) => {
        axiosSecure.delete(`/riders/${id}`)
        .then(res => {
            if(res.data.deletedCount){
                 refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Delete Successfully`,
                        showConfirmButton: false,
                        timer: 2000
                    });
            }
        })
    }

    return (
        <div>
            <h2 className='text-4xl font-semibold text-secondary'>Riders Pending Approval ({riders.length}) </h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra ">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>District</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            riders.map((rider, index) =>
                                <tr>
                                    <th>{index + 1}</th>
                                    <td>{rider.name}</td>
                                    <td>{rider.email}</td>
                                    <td> {rider.district} </td>
                                    <td className={`${rider.status == 'approved' ? 'text-green-500' : 'text-yellow-600'}`}> {rider.status} </td>
                                    <td className='space-x-2'>
                                        <button onClick={() => handleApproval(rider)} className='btn'><FaUserCheck /></button>
                                        <button onClick={() => handleRejection(rider)} className='btn'><IoPersonRemoveSharp /></button>
                                        <button onClick={() => handleDeleteRider(rider._id)} className='btn'><FaTrashAlt /></button>
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

export default ApproveRiders;