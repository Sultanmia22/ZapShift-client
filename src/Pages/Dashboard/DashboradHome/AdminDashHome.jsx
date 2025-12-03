import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import { Legend, Pie, PieChart, Tooltip } from 'recharts';

const AdminDashHome = () => {

    const axiosSecure = useAxiosSecure()

    const { data: delivaryStats = [] } = useQuery({
        queryKey: ['delivary-status-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/percel/delivery-status/stats')
            return res.data
        }
    })

    const getPichertData = data => {
        return data.map(item => {
            return {name: item.status,value:item.count}
        })
    }

    /*   const getPichertData = data => {
          return data.map(item => {
              return {name: item.status, value:item.count}
          })
      } */

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

            <div className='w-full h-[500px]'>
                <PieChart style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 2 }} responsive>
                    <Pie
                        dataKey="value"
                        startAngle={180}
                        endAngle={0}
                        data={getPichertData(delivaryStats)}
                        cx="50%"
                        cy="100%"
                        outerRadius="120%"
                        fill="#8884d8"
                        label
                        isAnimationActive={true}
                    />
                    <Legend/>
                    <Tooltip/>
                </PieChart>
            </div>
            {/*  <div className='w-full h-[500px]'>
                <PieChart style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 2 }} responsive>
                    <Pie
                        dataKey="value"
                        startAngle={180}
                        endAngle={0}
                        data={getPichertData(delivaryStats)}
                        cx="50%"
                        cy="100%"
                        outerRadius="120%"
                        fill="#8884d8"
                        label
                        isAnimationActive={true}
                    />
                    <Legend/>
                    <Tooltip/>
                </PieChart>
            </div> */}
        </div>
    );
};

export default AdminDashHome;