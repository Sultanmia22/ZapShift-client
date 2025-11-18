import React, { useEffect, useState } from 'react';

const Service = () => {
       const [servicedata, setData] = useState([])
        useEffect(() => {
            fetch('/service.json')
                .then(res => res.json())
                .then(data => {
                    setData(data)
                })
        }, [])
    return (
        <div className='bg-secondary p-[100px] my-[100px]'>
            <div className='text-center space-y-2'>
                <h2 className='text-base-100 text-4xl font-bold'>Our Services</h2>
                <p className='text-base-300'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to <br /> business shipments — we deliver on time, every time.</p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-3 md:pt-6'>
                {
                    servicedata.map(data => 
                        <div className='p-5 bg-base-100 hover:bg-primary  shadow border border-gray-100 rounded-xl'>
                            <figure className='w-10 h-10 mx-auto bg-blue-100 rounded-full'>
                                <img src={data.image} alt="" className='w-10 h-10 p-2'/>
                            </figure>
                            <div className='pt-0 md:pt-2 text-center'>
                                <h2 className='text-xl font-bold'>{data.title}</h2>
                                <p>{data.description}</p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Service;