import React, { useEffect, useState } from 'react';

const HowWork = () => {
    const [workdata, setData] = useState([])
    useEffect(() => {
        fetch('/howWork.json')
            .then(res => res.json())
            .then(data => {
                setData(data)
            })
    }, [])

    return (
        <div className='md:w-[1282px] mx-5 md:mx-auto my-[100px]'>
            <h2 className='font-bold text-3xl md:text-start pb-2 md:pb-5'> How it Work </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                {
                    workdata.map(data =>
                        <div className='p-5 shadow border border-gray-100 rounded-xl'>
                            <figure>
                                <img src={data.image} alt="" />
                            </figure>
                            <div className='pt-0 md:pt-6'>
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

export default HowWork;