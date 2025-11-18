import React from 'react';
import Banner from './Banner';
import HowWork from './HowWork';
import Service from './Service';
import Brands from './Brands';
import Process from './Process';
import Review from './Review';
import FAq from './FAq';


const Home = () => {
    return (
        <div>
            <Banner/>
            <HowWork/>
            <Service/>
            <Brands/>
            <Process/>
            <Review/>
            <FAq/>
        </div>
    );
};

export default Home;