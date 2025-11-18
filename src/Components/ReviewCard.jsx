import React from 'react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import reviewQoute from '../../src/assets/reviewQuote.png'
const ReviewCard = ({ reviewData }) => {
    console.log(reviewData)
    return (
        <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={3}
            coverflowEffect={{
                rotate:0,
                stretch: '50%',
                depth: 100,
                modifier: 1,
                
                slideShadows: true,
            }}
            autoplay={{
                        delay:2000,
                        disableOnInteraction: false,
                    }}
            pagination={true}
            modules={[EffectCoverflow, Pagination,Autoplay]}
            className="mySwiper"
        >

            {
                reviewData.map(data =>
                    <SwiperSlide>
                        <div className='bg-base-100 shadow-md rounded-2xl px-5 py-10'>
                            <div> <img src={reviewQoute} alt="" /> </div>
                            <p>{data.review}</p>
                            <div className='border-2  border-dashed border-gray-400 my-5'></div>
                            <div className='flex gap-4'>
                                <div>
                                    <img src={data.user_photoURL} alt="" className='w-15 h-15 rounded-full' />
                                </div>
                                <div>
                                    <h2 className='font-bold'>{data.userName}</h2>
                                    <p></p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                )
            }


        </Swiper>
    );
};

export default ReviewCard;