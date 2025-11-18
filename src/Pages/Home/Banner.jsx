import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import bannerImg1 from '../../assets/banner/banner1.png'
import bannerImg2 from '../../assets/banner/banner2.png'
import bannerImg3 from '../../assets/banner/banner3.png'
import { FaArrowCircleRight } from 'react-icons/fa';
const Banner = () => {
    return (
        <div>
            
            <Carousel
             autoPlay={true} 
            infiniteLoop={true}
            >
                <div className='relative'>
                    <img src={bannerImg1} />
                   
                    <div className='hidden xl:flex xl:flex-col absolute bottom-15 left-30'>
                        <p className='text-start text-gray-500'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal <br /> packages to business shipments — we deliver on time, every time.</p>
                        <div className='flex items-center gap-3 py-3'>
                           <div className='flex items-center '>
                             <button className='btn bg-primary text-secondary font-bold rounded-full'>Track Your Parcel</button>
                            <span className='-rotate-45'><FaArrowCircleRight size={24} /></span>
                           </div>
                            <button className='btn text-secondary font-bold'>Be A Rider</button>
                        </div>
                    </div>
                     
                </div>
                <div>
                    <img src={bannerImg2} />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src={bannerImg3} />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;