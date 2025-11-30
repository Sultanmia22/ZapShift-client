import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import { FaUserShield } from 'react-icons/fa';
import { FiShieldOff } from 'react-icons/fi';
import Swal from 'sweetalert2';

const UsersManagement = () => {

    const axiosSecure = useAxiosSecure()
    const [searchText,setSearchText] = useState('')


    const { data: users = [], isLoading, isError, refetch } = useQuery({

        queryKey: ['users',searchText],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?searchText=${searchText}`)
            return res.data
        }
    })

    //! Handle Make User Function


    const handleMakeAdmin = (user) => {

        const roleInfo = { role: 'admin' }

        axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: ` Admin make has been successfully`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }

    //! Handle Make User Function
    const handleUnAdmin = (user) => {

        const roleInfo = { role: 'user' }

        axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: ` Admin make has been successfully`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }

    return (
        <div>
            <h2 className='text-4xl font-semibold'> Manage Users: {users.length} </h2>

            <div className='p-10'>
                <label className="input">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input onChange={(e) => setSearchText(e.target.value)} type="search" className="grow" placeholder="Search User" />
                </label>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                No.
                            </th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Admin Action</th>
                            <th>Others Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) =>
                                <tr key={user._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={user?.photoURL}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{user?.displayName}</div>
                                                <div className="text-sm opacity-50">United States</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {user?.email}
                                    </td>

                                    <td>{user.role}</td>

                                    <td className='flex gap-2'>

                                        {
                                            user?.role === 'admin' ?
                                                <button className='bg-red-400 btn btn-sm text-white font-bold' onClick={() => handleUnAdmin(user)}> <FiShieldOff size={16} /> </button>
                                                :
                                                <button className='bg-green-400 btn btn-sm text-white font-bold' onClick={() => handleMakeAdmin(user)}> <FaUserShield size={16} /> </button>
                                        }

                                    </td>

                                    <th>
                                        Action
                                    </th>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersManagement;