import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hook/useAxiosSecure';

const AdminDashHome = () => {

    const axiosSecure = useAxiosSecure()

    const { data: delivaryStats = [] } = useQuery({
        queryKey: ['delivary-status-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/percel/delivery-status/stats')
            return res.data
        }
    })

    return (
        <div>
            <h2 className='text-xl font-semibold text-secondary p-5'> Admin Home  </h2>
            <div className='px-10'>
                <div className="stats shadow">
                    {
                        delivaryStats.map(stat =>
                            <div className="stat">
                                <div className="stat-title">{stat._id}</div>
                                <div className="stat-value">{stat.count}</div>
                                <div className="stat-desc">21% more than last month</div>
                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    );
};

export default AdminDashHome;