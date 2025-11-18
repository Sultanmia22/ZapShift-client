import React, { useEffect, useState } from 'react';
import customerImg from '../../assets/customer-top.png'
import ReviewCard from '../../Components/ReviewCard';
const Review = () => {
    const [reviewData,setReviewData]  = useState([])
    useEffect(() => {
        fetch('Review.json')
        .then(res => res.json())
        .then(data => {
            setReviewData(data)
        })
    },[])

  

    return (
        <div className='mb-[100px]'>
            <div className='flex flex-col justify-center items-center pb-10'>
                <img src={customerImg} alt="" className='w-[244px] h-[100px]' />
                <h2 className='text-4xl font-bold text-secondary'>What our customers are sayings</h2>
                <p className='text-center'>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce <br /> pain, and strengthen your body with ease!</p>
            </div>

            <div>
                <ReviewCard reviewData={reviewData}></ReviewCard>
            </div>

        </div>
    );
};

export default Review;