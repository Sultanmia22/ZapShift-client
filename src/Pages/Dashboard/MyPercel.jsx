
import React from 'react';
import useAuth from '../../Hook/useAuth';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FiEdit } from 'react-icons/fi';
import { FaSearch } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import { Link } from 'react-router';


const MyPercel = () => {
 
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: percels, isLoading, error ,refetch} = useQuery({
        queryKey: ['mypercels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/percels?email=${user?.email}`)
            return res.data
        }
    })

    //! Handle Delete 
    const handleDelete = (id) => {
        console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                
                axiosSecure.delete(`/percel/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your percel request has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    //! handle percel payment 


        const handlePayment =async (percel) => {
            const paymentInfo = {
                cost:percel.cost,
                percelName:percel.percelName,
                percelId : percel._id,
                senderEmail: percel.senderEmail,
            }

            const res = await axiosSecure.post(`/create-checkout-session`,paymentInfo)
            window.location.assign(res.data.url)
        }

    if (isLoading) {
        return <div> <p>Loading...</p> </div>
    }

    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>cost</th>
                        <th>Date</th>
                        <th>Payment</th>
                        <th>Dalevary Status</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}

                    {
                        percels.map((percel, index) =>
                            <tr key={percel._id}>
                                <th>{index + 1}</th>
                                <td>{percel.percelName}</td>
                                <td>{percel.cost}</td>
                                <td>{percel.createdAt}</td>
                                <td>
                                    {
                                        percel.paymentStatus === 'paid' ? 
                                         
                                        <span className='text-green-400'>Paid</span> 
                                        : 
                                       
                                        <button onClick={() => handlePayment(percel)} className='btn btn-sm btn-primary text-black'> Pay </button>
                                       
                                    }
                                </td>
                                <td>{percel.dalevaryStatus}</td>
                                <td>
                                    <button className='btn btn-square ml-2'> <FaSearch /></button>
                                    <button className='btn btn-square ml-2'> <FiEdit /> </button>
                                    <button onClick={() => handleDelete(percel._id)} className='btn btn-square ml-2'> <MdDelete /> </button>
                                </td>
                            </tr>

                        )
                    }

                </tbody>
            </table>
        </div>
    );
};

export default MyPercel;