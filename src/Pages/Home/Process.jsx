import React, { useEffect, useState } from 'react';

const Process = () => {
    const [processdata, setData] = useState([])
    useEffect(() => {
        fetch('process.json')
            .then(res => res.json())
            .then(data => {
                setData(data)
            })
    }, [])

    return (
        <div className='grid grid-cols-1 gap-5 my-[100px] md:w-[1282px] mx-auto'>
            {
                processdata.map(data =>
                    <div className='bg-base-100 border-2 shadow border-gray-100 flex gap-10 items-center p-8'>
                        <div>
                            <img src={data.image} alt="" />
                        </div>
                        <div className='border-2 h-full border-dashed border-gray-200'></div>
                        <div>
                            <h2 className='text-2xl text-secondary font-bold'>{data.title}</h2>
                            <p className='text-gray-700'>{data.description}</p>
                        </div>
                    </div>
                )
            }
        </div>

    );
};

export default Process;