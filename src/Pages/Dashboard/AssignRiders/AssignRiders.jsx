import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import Swal from 'sweetalert2';

const AssignRiders = () => {

    const axiosSecure = useAxiosSecure()
    const riderModalRef = useRef();
    const [selectedPercel, setSelectedPercel] = useState(null);
    // console.log(selectedPercel)

    const { data: percels = [], isLoading, isError, refetch } = useQuery({

        queryKey: ['percel', 'pending-pickup'],
        queryFn: async () => {
            const res = await axiosSecure.get('/percel-status?delivaryStatus=pending-pickup')
            return res.data
        }

    })

    const { data: riders = [] } = useQuery({
        queryKey: selectedPercel ? ['riders', selectedPercel.senderDistrict, 'available'] : ['riders'],
        enabled: !!selectedPercel,
        queryFn: async () => {
            const res = await axiosSecure.get(`/riders-assign?status=approved&district=${selectedPercel.senderDistrict}&workStatus=available`);
            return res.data;
        }
    })


    //! modal 
    const openAssignRiderModal = (percel) => {
        setSelectedPercel(percel)
        riderModalRef.current.showModal()
    }

    //! Handle Assign Rider 
    const handleAssignRider = (rider) => {
        const riderInfo = {
            riderName: rider.name,
            riderEmail: rider.email,
            riderId: rider._id,
            percelId: selectedPercel._id,
            trackingId: selectedPercel.trackingId
        }

        axiosSecure.patch(`/percel/${selectedPercel._id}`, riderInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    riderModalRef.current.close()
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Rider has been Assigned",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    if (isLoading) {
        return <div> <p>Loading...</p> </div>
    }

    return (
        <div>
            <h2 className="text-4xl font-semibold p-2 md:p-8">Assign Riders: {percels.length}</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>CreatedAt</th>
                            <th>PickUP District</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            percels.map((percel, index) =>
                                <tr>
                                    <th>{index + 1}</th>
                                    <td> {percel.percelName} </td>
                                    <td>{percel.cost}</td>
                                    <td>{percel.createdAt}</td>
                                    <td> {percel.senderDistrict} </td>
                                    <td>
                                        <button onClick={() => openAssignRiderModal(percel)} className='btn btn-sm btn-primary text-secondary'> Find Rider </button>
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>


            <dialog ref={riderModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box max-w-7xl">
                    <h3 className="font-bold text-lg">Riders: {riders.length}</h3>

                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>District</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    riders.map((rider, index) =>
                                        <tr key={rider._id}>
                                            <th>{index + 1}</th>
                                            <td>{rider.name}</td>
                                            <td>{rider.email}</td>
                                            <td>{rider.district}</td>
                                            <td>
                                                <button onClick={() => handleAssignRider(rider)} className='btn btn-primary text-secondary'> Assign </button>
                                            </td>
                                        </tr>
                                    )
                                }

                            </tbody>
                        </table>
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    );
};

export default AssignRiders;