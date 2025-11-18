import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import amazon from '../../assets/brands/amazon.png'
import amazonvector from '../../assets/brands/amazon_vector.png'
import casio from '../../assets/brands/casio.png'
import moonstar from '../../assets/brands/moonstar.png'
import randstad from '../../assets/brands/randstad.png'
import star from '../../assets/brands/star.png'
import start_people from '../../assets/brands/start_people.png'
import { Autoplay } from 'swiper/modules';

const brandsLogo = [amazon, amazonvector, casio, moonstar, randstad, star, start_people]
const Brands = () => {
    return (
        <div>
            <h2 className='text-2xl text-center font-bold text-secondary'>We've helped thousands of sales teams</h2>
            <div className='py-5 md:py-10'>
                <Swiper
                    slidesPerView={4}
                    centeredSlides={true}
                    spaceBetween={30}
                    grabCursor={true}
                    loop={true}
                      modules={[Autoplay]}
                    autoplay={{
                        delay:1000,
                        disableOnInteraction: false,
                    }}
                >

                    {
                        brandsLogo.map(logo =>
                            <SwiperSlide>
                                <img src={logo} alt="" />
                            </SwiperSlide>

                        )
                    }

                </Swiper>
            </div>
        </div>
    );
};

export default Brands;